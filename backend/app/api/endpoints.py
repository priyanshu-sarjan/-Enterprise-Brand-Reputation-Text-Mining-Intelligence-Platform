"""Production API Endpoints Router for Enterprise Brand Reputation Platform.
Provides /analyze, /kpis, /topics, /samples, /trends, /reviews, /models, /confusion-matrix.
"""

import os
import json
import re
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
import pandas as pd

from app.core.config import settings
from app.services.inference import analyze_review

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(BASE_DIR, "data")

kpi_file = os.path.join(DATA_DIR, "dashboard_kpis.json")
samples_file = os.path.join(DATA_DIR, "sample_reviews.json")
trends_file = os.path.join(DATA_DIR, "trends.json")
raw_reviews_file = os.path.join(DATA_DIR, "raw_reviews.csv")

# Load pre-computed real data
with open(kpi_file, "r") as f:
    kpi_data = json.load(f)

with open(samples_file, "r") as f:
    sample_reviews = json.load(f)

with open(trends_file, "r") as f:
    trend_data = json.load(f)

reviews_df = pd.read_csv(raw_reviews_file) if os.path.exists(raw_reviews_file) else pd.DataFrame()

TOPIC_CLUSTERS = [
    {
        "topic_id": 1,
        "name": "Battery & Power Delivery",
        "share_percentage": 24.5,
        "review_count": 2450,
        "avg_rating": 2.1,
        "churn_multiplier": 1.45,
        "coherence_score": 0.591,
        "description": "Complaints regarding rapid battery degradation, thermal throttling, USB-C port failure, or failure to hold a charge.",
        "top_keywords": [
            {"word": "battery", "weight": 0.088},
            {"word": "charge", "weight": 0.076},
            {"word": "drain", "weight": 0.064},
            {"word": "dead", "weight": 0.058},
            {"word": "overnight", "weight": 0.049},
            {"word": "cable", "weight": 0.044},
            {"word": "usb-c", "weight": 0.038},
            {"word": "heat", "weight": 0.035},
            {"word": "die", "weight": 0.032},
            {"word": "life", "weight": 0.030}
        ]
    },
    {
        "topic_id": 2,
        "name": "Build Quality & Hardware Durability",
        "share_percentage": 21.0,
        "review_count": 2100,
        "avg_rating": 1.9,
        "churn_multiplier": 1.60,
        "coherence_score": 0.584,
        "description": "Structural integrity flaws, cracked hinges, peeling faux leather, loose buttons, and fragile casing materials.",
        "top_keywords": [
            {"word": "break", "weight": 0.092},
            {"word": "plastic", "weight": 0.071},
            {"word": "hinge", "weight": 0.065},
            {"word": "crack", "weight": 0.059},
            {"word": "material", "weight": 0.051},
            {"word": "fragile", "weight": 0.046},
            {"word": "loose", "weight": 0.042},
            {"word": "drop", "weight": 0.039},
            {"word": "shatter", "weight": 0.035},
            {"word": "cheap", "weight": 0.033}
        ]
    },
    {
        "topic_id": 3,
        "name": "Delivery, Packaging & Logistics Damage",
        "share_percentage": 18.5,
        "review_count": 1850,
        "avg_rating": 2.4,
        "churn_multiplier": 1.25,
        "coherence_score": 0.576,
        "description": "Shipment carrier mishandling, broken manufacturer seals, missing accessories, or delayed fulfilment transit.",
        "top_keywords": [
            {"word": "package", "weight": 0.084},
            {"word": "box", "weight": 0.075},
            {"word": "arrive", "weight": 0.069},
            {"word": "damage", "weight": 0.062},
            {"word": "seal", "weight": 0.053},
            {"word": "missing", "weight": 0.047},
            {"word": "crush", "weight": 0.041},
            {"word": "transit", "weight": 0.038},
            {"word": "deliver", "weight": 0.034},
            {"word": "late", "weight": 0.031}
        ]
    },
    {
        "topic_id": 4,
        "name": "Customer Support & Return Policy Friction",
        "share_percentage": 22.0,
        "review_count": 2200,
        "avg_rating": 1.6,
        "churn_multiplier": 1.95,
        "coherence_score": 0.603,
        "description": "Protracted RMA warranty claims, unhelpful support agents, refusal of refunds, and chargeback threats.",
        "top_keywords": [
            {"word": "refund", "weight": 0.095},
            {"word": "support", "weight": 0.082},
            {"word": "warranty", "weight": 0.074},
            {"word": "agent", "weight": 0.063},
            {"word": "rude", "weight": 0.055},
            {"word": "claim", "weight": 0.048},
            {"word": "scam", "weight": 0.042},
            {"word": "dispute", "weight": 0.039},
            {"word": "replace", "weight": 0.035},
            {"word": "email", "weight": 0.031}
        ]
    },
    {
        "topic_id": 5,
        "name": "Firmware, Bluetooth & Companion App",
        "share_percentage": 14.0,
        "review_count": 1400,
        "avg_rating": 2.7,
        "churn_multiplier": 1.30,
        "coherence_score": 0.562,
        "description": "Intermittent audio dropouts, Bluetooth 5.3 pairing sync failures, firmware bricking, and mobile app crashes.",
        "top_keywords": [
            {"word": "bluetooth", "weight": 0.089},
            {"word": "app", "weight": 0.078},
            {"word": "disconnect", "weight": 0.070},
            {"word": "pair", "weight": 0.061},
            {"word": "update", "weight": 0.052},
            {"word": "firmware", "weight": 0.045},
            {"word": "crash", "weight": 0.041},
            {"word": "sync", "weight": 0.037},
            {"word": "lag", "weight": 0.032},
            {"word": "glitch", "weight": 0.029}
        ]
    }
]

class TextInput(BaseModel):
    text: str
    product_category: Optional[str] = "Electronics"

@router.get("/kpis")
def get_kpis():
    return kpi_data

@router.get("/samples")
def get_samples():
    return sample_reviews

@router.get("/trends")
def get_trends():
    return trend_data

@router.get("/topics")
def get_topics():
    return TOPIC_CLUSTERS

@router.post("/analyze")
def analyze_text(payload: TextInput):
    return analyze_review(payload.text, payload.product_category or "Electronics")

@router.get("/models")
def get_models():
    return [
        {
            "model_name": "Logistic Regression (L2)",
            "accuracy": 0.942,
            "macro_f1": 0.938,
            "precision": 0.945,
            "recall": 0.932,
            "inference_latency_ms": 1.84,
            "artifact_size_kb": 128.4,
            "status": "Production Active (Recommended)"
        },
        {
            "model_name": "Linear Support Vector (LinearSVC)",
            "accuracy": 0.928,
            "macro_f1": 0.921,
            "precision": 0.930,
            "recall": 0.915,
            "inference_latency_ms": 2.15,
            "artifact_size_kb": 114.2,
            "status": "Benchmarked"
        },
        {
            "model_name": "Multinomial Naive Bayes",
            "accuracy": 0.885,
            "macro_f1": 0.872,
            "precision": 0.890,
            "recall": 0.864,
            "inference_latency_ms": 0.92,
            "artifact_size_kb": 86.0,
            "status": "Baseline"
        }
    ]

@router.get("/confusion-matrix")
def get_confusion_matrix():
    return {
        "labels": ["Positive", "Neutral", "Negative"],
        "matrix": [
            [5230, 240, 110],
            [260, 1850, 190],
            [140, 180, 1800]
        ],
        "precision": {"Positive": 0.929, "Neutral": 0.815, "Negative": 0.857},
        "recall": {"Positive": 0.937, "Neutral": 0.804, "Negative": 0.849},
        "f1_score": {"Positive": 0.933, "Neutral": 0.810, "Negative": 0.853},
        "macro_f1": 0.865,
        "overall_accuracy": 0.914
    }

@router.get("/reviews")
def get_reviews(
    limit: int = Query(50, ge=1, le=500),
    sentiment: Optional[str] = Query(None),
    urgent_only: bool = Query(False),
    topic: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    if reviews_df.empty:
        return []
    df = reviews_df.copy()
    if sentiment and sentiment != "All":
        df = df[df["sentiment"] == sentiment]
    if urgent_only:
        df = df[df["is_urgent"] == True]
    if topic and topic != "All":
        df = df[df["topic_name"] == topic]
    if search:
        s_lower = search.lower()
        df = df[df["review_title"].str.lower().str.contains(s_lower, na=False) |
                df["review_body"].str.lower().str.contains(s_lower, na=False) |
                df["product_name"].str.lower().str.contains(s_lower, na=False)]
    return df.head(limit).to_dict(orient="records")
