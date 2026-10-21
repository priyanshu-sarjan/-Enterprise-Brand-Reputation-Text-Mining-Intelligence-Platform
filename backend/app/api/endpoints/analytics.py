"""Aggregated dashboard metrics, KPIs, trends, reviews, and model evaluations."""

from typing import List, Optional
from fastapi import APIRouter, Query, HTTPException
from app.schemas.review_schema import (
    KPISummary,
    TrendPoint,
    ReviewRecord,
    ReviewCreate,
    ConfusionMatrixData,
    ModelBenchmark
)
from app.ml.model_engine import model_engine

router = APIRouter()

@router.get("/kpis", response_model=KPISummary)
def get_kpis():
    """
    Returns executive-level summary KPIs:
    - Total review volume
    - Net Sentiment Score (NSS = % Pos - % Neg)
    - Average star rating
    - High-urgency escalation count & rate
    - Estimated ARR churn exposure from dissatisfied repeat buyers
    """
    return model_engine.get_kpis()

@router.get("/trends", response_model=List[TrendPoint])
def get_trends():
    """
    Returns 12-month time-series aggregated sentiment trends:
    - Positive, Neutral, Negative counts
    - Net Sentiment Score trajectory
    - Average rating trajectory
    """
    return model_engine.get_trends()

@router.get("/models", response_model=List[ModelBenchmark])
def get_model_benchmarks():
    """
    Returns comparative performance metrics for evaluated algorithms:
    - Logistic Regression (L2)
    - LinearSVC
    - Multinomial Naive Bayes
    """
    return model_engine.benchmark_metrics

@router.get("/confusion-matrix", response_model=ConfusionMatrixData)
def get_confusion_matrix():
    """
    Returns multi-class confusion matrix and classification metrics (precision, recall, F1 per class).
    """
    return model_engine.get_confusion_matrix()

@router.get("/reviews", response_model=List[ReviewRecord])
def get_reviews(
    limit: int = Query(50, ge=1, le=500),
    sentiment: Optional[str] = Query(None, description="All, Positive, Neutral, Negative"),
    urgent_only: bool = Query(False, description="Filter for high-urgency escalations"),
    topic: Optional[str] = Query(None, description="Filter by topic cluster"),
    search: Optional[str] = Query(None, description="Search keyword in reviews")
):
    """
    Returns review records with real-time filtering and search.
    """
    return model_engine.get_reviews(
        limit=limit,
        sentiment=sentiment,
        urgent_only=urgent_only,
        topic=topic,
        search=search
    )

@router.post("/reviews", response_model=ReviewRecord)
def create_review(review: ReviewCreate):
    """
    Ingests a new customer review, classifies it in real-time, and updates system KPIs.
    """
    return model_engine.add_review(review.dict())
