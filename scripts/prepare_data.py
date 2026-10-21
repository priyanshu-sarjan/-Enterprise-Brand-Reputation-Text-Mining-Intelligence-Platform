"""Enterprise Brand Reputation Data Preparation & Model Training Pipeline.
Generates 10,000+ realistic e-commerce and SaaS reviews, trains TF-IDF, Logistic Regression,
and LDA topic models, and exports production .joblib artifacts and pre-computed KPI summaries.
"""

import os
import json
import random
import re
from datetime import datetime, timedelta
import joblib
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.decomposition import LatentDirichletAllocation

# Seed for absolute reproducibility
random.seed(42)
np.random.seed(42)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
BACKEND_DATA_DIR = os.path.join(BASE_DIR, "backend", "data")
BACKEND_ARTIFACTS_DIR = os.path.join(BASE_DIR, "backend", "artifacts")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(BACKEND_DATA_DIR, exist_ok=True)
os.makedirs(BACKEND_ARTIFACTS_DIR, exist_ok=True)

# 1. Base Real-World Review Templates across 5 Root Cause Domains
REVIEW_PATTERNS = {
    "positive": [
        ("Exceptional battery life and fast charging", "Battery lasts easily 35 hours on a single charge. USB-C quick charge is a game changer for frequent travel.", 5, "Battery & Power Delivery", 149.99),
        ("Best audio clarity in this price bracket", "Soundstage is expansive, crisp highs and deep punchy bass. Noise cancellation blocks out all subway rumble.", 5, "Build Quality & Hardware Durability", 179.99),
        ("Pristine packaging and next-day delivery", "Shipped in double-sealed manufacturer box with zero transit damage. All accessories neatly arranged.", 5, "Delivery, Packaging & Logistics Damage", 89.99),
        ("Outstanding enterprise customer support", "Customer care resolved my pairing inquiry in under five minutes. Polite, professional, and fast replacement.", 5, "Customer Support & Return Policy Friction", 199.99),
        ("Flawless Bluetooth 5.3 connection", "Instant pairing with my MacBook and iPhone. No audio lag or latency when streaming video content.", 5, "Firmware, Bluetooth & Companion App", 129.99),
        ("Sturdy aluminum build and memory foam comfort", "Headband has zero creaking and memory foam cushions are comfortable even after 8 hours of coding.", 5, "Build Quality & Hardware Durability", 159.99),
        ("Not bad at all, actually surprisingly great", "Honestly not bad at all for the price. Build quality is solid and microphone captures voice very clearly.", 4, "Build Quality & Hardware Durability", 99.99),
        ("Reliable battery performance", "Provides a full week of daily commutes without needing a recharge. Indicator LED is accurate and helpful.", 4, "Battery & Power Delivery", 119.99),
        ("Seamless multi-point device sync", "Switches between laptop Zoom calls and smartphone audio seamlessly. Companion app EQ presets work well.", 5, "Firmware, Bluetooth & Companion App", 139.99),
        ("Delighted with overall build and audio", "High quality materials, tactile volume dial, and punchy acoustic profile. Highly recommended.", 5, "Build Quality & Hardware Durability", 169.99)
    ],
    "neutral": [
        ("Acceptable hardware with companion app glitches", "Sound quality is decent for the price point, but the smartphone app occasionally crashes when adjusting EQ.", 3, "Firmware, Bluetooth & Companion App", 99.99),
        ("Average battery life with ANC enabled", "Advertised as 30 hours, but real world usage with active noise cancellation is closer to 16 hours.", 3, "Battery & Power Delivery", 129.99),
        ("Mediocre microphone in windy environments", "Listening experience is great, but colleagues complain about background wind noise during outdoor calls.", 3, "Build Quality & Hardware Durability", 119.99),
        ("Delayed shipping without tracking updates", "Headphones work well, however delivery took 6 extra days and carrier tracking was unavailable.", 3, "Delivery, Packaging & Logistics Damage", 89.99),
        ("Decent acoustics but tight clamping force", "Sound fidelity is good, but the headband clamps quite hard on the ears during long sessions.", 3, "Build Quality & Hardware Durability", 149.99),
        ("Plastic feels slightly lightweight", "Works as expected, though casing feels more plastic than metallic. Acceptable entry level unit.", 3, "Build Quality & Hardware Durability", 79.99)
    ],
    "negative": [
        ("Battery completely dead within 48 hours", "Battery drained from full to empty in 45 minutes and now refuses to charge. Defective power management chip.", 1, "Battery & Power Delivery", 149.99),
        ("Plastic hinge snapped on normal usage", "Hinge cracked on the second week of normal use. Cheap brittle plastic. Unacceptable build quality.", 1, "Build Quality & Hardware Durability", 159.99),
        ("Support hung up - refused warranty refund", "Customer service refused to honor the warranty and hung up on me. Total scam, filing credit card dispute!", 1, "Customer Support & Return Policy Friction", 179.99),
        ("Box arrived crushed - auxiliary cable missing", "Shipment carton was torn open, security seal was cut, and audio cable was missing. Flimsy logistics.", 1, "Delivery, Packaging & Logistics Damage", 119.99),
        ("Continuous Bluetooth disconnects every 2 minutes", "Audio cuts out constantly when walking. Firmware update bricked the pairing sensor. Completely unusable.", 2, "Firmware, Bluetooth & Companion App", 139.99),
        ("Charging port fire hazard - gets boiling hot", "The USB-C port overheated and melted the insulation jacket on my cable. Extreme fire hazard and safety defect.", 1, "Battery & Power Delivery", 189.99),
        ("Refusing refund - fraudulent return terms", "Sent back defective unit under 30-day policy, company claimed it never arrived and refuses refund. Total fraud!", 1, "Customer Support & Return Policy Friction", 199.99),
        ("Audio distortion in right ear cup", "Persistent crackling and buzzing in the right driver at normal volume. Defective speaker diaphragm.", 2, "Build Quality & Hardware Durability", 129.99),
        ("Terrible customer service and broken promise", "Representative promised a replacement RMA tracking number three weeks ago. Still nothing. Demanding chargeback.", 1, "Customer Support & Return Policy Friction", 149.99),
        ("Unacceptable latency and app crashes", "Bluetooth sync delay is almost a full second out of sync with video. App crashes immediately on launch.", 2, "Firmware, Bluetooth & Companion App", 109.99)
    ]
}

PRODUCTS = [
    ("ReputeIQ Apex Wireless ANC Headphone", "Electronics"),
    ("Vortex Pro Active Earbuds", "Audio"),
    ("Aura Studio Soundbar 3.1", "Smart Home"),
    ("Pulse Smartwatch Tracker Gen 4", "Wearables"),
    ("Titan Gaming Headset 7.1", "Gaming"),
    ("Clarity USB-C Streaming Mic", "Audio")
]

USER_NAMES = [
    "Sarah Jenkins", "Michael Chang", "David Miller", "Priya Sharma",
    "Alex Rivera", "Elena Rostova", "Marcus Vance", "Chloe Bennett",
    "Liam O'Connor", "Aarav Patel", "Zack Taylor", "Rachel Green",
    "Emma Watson", "Daniel Craig", "Jessica Alba", "Carlos Santana"
]

print("1. Generating 10,000 real-world customer review records...")
records = []
now = datetime.now()

# Sentiment target distribution: ~65% Positive, 13% Neutral, 22% Negative (realistic mature brand)
for i in range(10000):
    rand_val = random.random()
    if rand_val < 0.65:
        category_key = "positive"
    elif rand_val < 0.78:
        category_key = "neutral"
    else:
        category_key = "negative"

    pattern = random.choice(REVIEW_PATTERNS[category_key])
    product = random.choice(PRODUCTS)
    user = random.choice(USER_NAMES)
    days_ago = random.randint(0, 365)
    review_date = (now - timedelta(days=days_ago)).strftime("%Y-%m-%d")

    # Rating with slight noise
    rating = pattern[2]
    if random.random() < 0.1:
        rating = max(1, min(5, rating + random.choice([-1, 1])))

    # Label: 0=Negative (1-2), 1=Neutral (3), 2=Positive (4-5)
    sentiment_label = 0 if rating <= 2 else (1 if rating == 3 else 2)
    sentiment_text = "Negative" if sentiment_label == 0 else ("Neutral" if sentiment_label == 1 else "Positive")

    # High urgency churn detection
    text_full = f"{pattern[0]}. {pattern[1]}"
    is_urgent = bool(re.search(r"\b(refund|cancel|damaged|faulty|worst|never buying|lawsuit|scam|fraud|exploded|dispute)\b", text_full, re.I)) and (sentiment_label <= 1)

    records.append({
        "id": f"REV-{10000 + i}",
        "date": review_date,
        "user_name": user,
        "product_name": product[0],
        "category": product[1],
        "rating": rating,
        "sentiment": sentiment_text,
        "sentiment_id": sentiment_label,
        "review_title": pattern[0],
        "review_body": pattern[1],
        "text": text_full,
        "topic_name": pattern[3],
        "price": pattern[4],
        "verified_purchase": random.random() > 0.15,
        "is_urgent": is_urgent,
        "helpful_votes": random.randint(0, 60)
    })

df = pd.DataFrame(records)
raw_csv_path = os.path.join(DATA_DIR, "raw_reviews.csv")
backend_raw_csv = os.path.join(BACKEND_DATA_DIR, "raw_reviews.csv")
df.to_csv(raw_csv_path, index=False)
df.to_csv(backend_raw_csv, index=False)
print(f"   Saved {len(df)} records to {raw_csv_path}")

# 2. Train TF-IDF & Logistic Regression Classifier
print("2. Fitting TF-IDF Vectorizer (5,000 features, n-grams 1-2)...")
vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2), stop_words='english', sublinear_tf=True)
X = vectorizer.fit_transform(df['text'])
joblib.dump(vectorizer, os.path.join(BACKEND_ARTIFACTS_DIR, "tfidf_vectorizer.joblib"))

print("3. Training L2 Logistic Regression Classifier...")
clf = LogisticRegression(max_iter=1000, C=1.0, random_state=42)
clf.fit(X, df['sentiment_id'])
joblib.dump(clf, os.path.join(BACKEND_ARTIFACTS_DIR, "sentiment_model.joblib"))

# 4. Fit Unsupervised LDA Topic Modeling
print("4. Training Latent Dirichlet Allocation (5 Topic Clusters)...")
lda = LatentDirichletAllocation(n_components=5, random_state=42, max_iter=20)
lda.fit(X)
joblib.dump(lda, os.path.join(BACKEND_ARTIFACTS_DIR, "lda_model.joblib"))

# 5. Export Pre-calculated Dashboard Metrics (Instantaneous Loading)
print("5. Exporting pre-computed dashboard KPIs...")
pos_count = int((df['sentiment_id'] == 2).sum())
neg_count = int((df['sentiment_id'] == 0).sum())
neu_count = int((df['sentiment_id'] == 1).sum())
total = len(df)
nss_score = round(((pos_count - neg_count) / total) * 100, 1)
urgent_count = int(df['is_urgent'].sum())
avg_rating = round(float(df['rating'].mean()), 2)

# Financial ARR at churn risk: Negative reviews among verified buyers * price * repeat factor
neg_verified = df[(df['sentiment_id'] == 0) & (df['verified_purchase'] == True)]
churn_arr = round(float(neg_verified['price'].sum() * 3.4), 2)

dashboard_summary = {
    "total_reviews": total,
    "net_sentiment_score": nss_score,
    "positive_percentage": round((pos_count / total) * 100, 1),
    "neutral_percentage": round((neu_count / total) * 100, 1),
    "negative_percentage": round((neg_count / total) * 100, 1),
    "sentiment_breakdown": {
        "positive": pos_count,
        "neutral": neu_count,
        "negative": neg_count
    },
    "high_urgency_count": urgent_count,
    "high_urgency_rate": round((urgent_count / total) * 100, 1),
    "avg_rating": avg_rating,
    "estimated_churn_arr_risk": churn_arr,
    "topic_count": 5,
    "top_complaint_topic": "Customer Support & Return Policy Friction"
}

kpi_path = os.path.join(BACKEND_DATA_DIR, "dashboard_kpis.json")
with open(kpi_path, "w") as f:
    json.dump(dashboard_summary, f, indent=2)
print(f"   Exported KPIs to {kpi_path}")

# 6. Save Sample Reviews for Interactive UI Scenarios
print("6. Exporting sample reviews for UI test scenarios...")
sample_reviews = [
    {
        "label": "🚨 High Churn Refund Risk",
        "text": "The battery completely died after two days. Customer support was rude and refused my refund. Total scam and fraud, filing a credit card dispute!",
        "sentiment": "Negative",
        "rating": 1,
        "is_urgent": True
    },
    {
        "label": "🔋 Battery Degradation",
        "text": "Battery drains from 100% to 15% in just two hours of minimal usage. USB-C port gets boiling hot while charging.",
        "sentiment": "Negative",
        "rating": 1,
        "is_urgent": True
    },
    {
        "label": "🎧 5-Star Audiophile Praise",
        "text": "Soundstage is expansive, crisp highs and deep punchy bass. Battery lasts easily 35 hours. Best investment this quarter!",
        "sentiment": "Positive",
        "rating": 5,
        "is_urgent": False
    },
    {
        "label": "📦 Crushed Packaging",
        "text": "The outer box arrived damaged and torn open, but the internal headphones were thankfully intact. Carrier tracking was delayed.",
        "sentiment": "Neutral",
        "rating": 3,
        "is_urgent": False
    },
    {
        "label": "⚖️ Negation Nuance ('Not bad')",
        "text": "Honestly not bad at all for the price point. Build quality is solid and microphone captures voice clearly.",
        "sentiment": "Positive",
        "rating": 4,
        "is_urgent": False
    },
    {
        "label": "📱 Companion App Bluetooth Glitch",
        "text": "Headphone hardware is acceptable, but the companion smartphone app crashes repeatedly on Android 14 and drops connection.",
        "sentiment": "Neutral",
        "rating": 3,
        "is_urgent": False
    }
]

samples_path = os.path.join(BACKEND_DATA_DIR, "sample_reviews.json")
with open(samples_path, "w") as f:
    json.dump(sample_reviews, f, indent=2)
print(f"   Exported sample scenarios to {samples_path}")

# 7. Pre-compute 12-Month Trends
print("7. Exporting 12-month longitudinal trends...")
df['month'] = pd.to_datetime(df['date']).dt.strftime("%Y-%m")
grouped = df.groupby('month')
trends = []
for month, group in sorted(grouped):
    tot = len(group)
    pos = int((group['sentiment_id'] == 2).sum())
    neu = int((group['sentiment_id'] == 1).sum())
    neg = int((group['sentiment_id'] == 0).sum())
    nss = round(((pos - neg) / tot) * 100, 1) if tot > 0 else 0.0
    r = round(float(group['rating'].mean()), 2) if tot > 0 else 0.0
    trends.append({
        "month": month,
        "positive_count": pos,
        "neutral_count": neu,
        "negative_count": neg,
        "total_count": tot,
        "net_sentiment_score": nss,
        "avg_rating": r
    })

trends_path = os.path.join(BACKEND_DATA_DIR, "trends.json")
with open(trends_path, "w") as f:
    json.dump(trends[-12:], f, indent=2)
print(f"   Exported 12-month trends to {trends_path}")

print("\nSUCCESS: All data pipelines, .joblib model artifacts, and pre-computed JSON datasets are ready.")
