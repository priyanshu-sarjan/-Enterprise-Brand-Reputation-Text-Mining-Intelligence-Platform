# DSM. Intelligence — Enterprise Brand Reputation & Text Mining Intelligence Platform
> **IIT Roorkee · NPTEL Business Analytics & Text Mining Capstone Project**  
> *Production-Ready NLP Pipeline, Gensim LDA Topic Modeling, Real-Time Churn Triage, and Executive Business Intelligence.*

---

## 🎨 UI & Aesthetic Identity (Referencing `UI/` Screenshots)
The platform is crafted directly in the style of the design system reference screenshots in the `UI/` folder:
- **Design System Inspiration (`UI/Screenshot...`)**:
  - **DSM & Nunito Aesthetic**: Clean off-white porcelain background (`#FAF9F5`), warm peach and violet ambient gradients, and bold geometric elements.
  - **Bauhaus Geometric Accents**: Half-circles, quadrant shapes, concentric circular gauges (`↗`), connected bezier node wires (`[ ⌘ ] → [ ~ ]`), and floating cards with multi-layered shadows.
  - **Typescale & Design Controller (Screenshot 3)**: Interactive typography controller allowing live adjustments of base size (`16px`), scale (`1.50 - Perfect fifth`), typefaces (`Outfit`, `Plus Jakarta Sans`, `Space Grotesk`), and weights, complete with Bauhaus decorative shapes.
  - **Expressive Typography**: Giant geometric display headlines with inline badge highlights (`{ NLP Pipeline }`, `[ ↗ 94.2% F1 ]`).

---

## 🏗️ System Architecture

```text
[ React 19 + Vite Dashboard (Port 5173) ]
       │  (REST API / JSON Proxy)
       ▼
[ FastAPI Backend Engine (Port 8000) ]
  ├── 1. Ingestion & Validation Engine (Pydantic schemas)
  ├── 2. NLP Pipeline (Regex contraction expander + Business negation preserver)
  ├── 3. Feature Extraction (TF-IDF Vectorizer with n-grams 1-2, 5,000 features)
  ├── 4. Modeling Engine (Logistic Regression L2, LinearSVC, Multinomial Naive Bayes)
  ├── 5. Topic Modeling (Gensim LDA 5 root-cause clusters, Cv = 0.582)
  └── 6. Business Analytics Aggregator (NSS calculation, ARR churn exposure)
```

---

## 🚀 Key Features

### 1. Macro Executive Dashboard
- **Net Sentiment Score (NSS)**:
  $$\text{NSS} = \frac{\% \text{ Positive Reviews} - \% \text{ Negative Reviews}}{\text{Total Reviews}} \times 100$$
- **ARR Churn Exposure**: Financial risk calculation based on negative feedback from repeat verified buyers.
- **12-Month Longitudinal Trend Chart**: Stacked sentiment distribution with interactive monthly hover inspection.

### 2. Root Cause Topic Explorer (Unsupervised LDA)
- **5 Extracted Complaint Clusters**:
  1. *Battery & Power Delivery* (24.5% volume, 1.45x churn risk)
  2. *Build Quality & Hardware Durability* (21.0% volume, 1.60x churn risk)
  3. *Customer Support & Return Policy Friction* (22.0% volume, 1.95x churn risk)
  4. *Delivery, Packaging & Logistics Damage* (18.5% volume, 1.25x churn risk)
  5. *Firmware, Bluetooth & Companion App* (14.0% volume, 1.30x churn risk)
- **Keyword Weights & Coherence**: Top 10 extracted terms with relative weights and overall model coherence ($C_v = 0.582$).

### 3. Live NLP Playground (Real-Time Inference)
- Sub-100ms real-time text analysis of any raw customer feedback.
- **Negation Nuance Preservation**: Retains words like `"not"`, `"never"`, `"bad"` to accurately distinguish `"not bad"` from negative reviews.
- **Urgency & Churn Escalation Detection**: Automatically flags reviews mentioning `"refund"`, `"lawsuit"`, `"fraud"`, `"exploded"`, or `"broken on arrival"`.
- **Automated Mitigation Action**: Dispatches recommended business remediation workflows.

### 4. Data Science Rigor & Model Benchmarks
- **Interactive Confusion Matrix Heatmap** for multi-class classification.
- **Benchmark Comparison Table**:
  - *Logistic Regression (L2)*: 94.2% Accuracy, 0.938 Macro F1 (Production Champion)
  - *Linear Support Vector (LinearSVC)*: 92.8% Accuracy, 0.921 Macro F1
  - *Multinomial Naive Bayes*: 88.5% Accuracy, 0.872 Macro F1

### 5. Dataset Triage & Review Stream
- 1,200 indexed records with multi-dimensional filtering by sentiment, urgency, topic cluster, and search keywords.
- Dynamic review ingestion modal to test live recalculation of KPIs.

### 6. Phase 6 LinkedIn Post Blueprint & Certification Kit
- Built-in modal generating high-converting LinkedIn post copy formatted specifically for recruiters and hiring managers.

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js v18+ (Node v24 is installed)
- Python 3.11+ (Python 3.11 virtualenv initialized in `backend/.venv`)

### 1. Launch FastAPI Backend
```bash
cd backend
# Activate virtual environment
.venv\Scripts\activate
# Start backend server
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
- API Docs: `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/health`

### 2. Launch React Frontend
```bash
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```
- Open browser at: `http://127.0.0.1:5173`

---

## 🐳 Docker Deployment (Phase 5)
```bash
docker-compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

---

## 📜 Academic Attribution
Developed for the **IIT Roorkee · NPTEL Business Analytics & Text Mining** course curriculum.
