"""Topic distributions & LDA root-cause clusters endpoint."""

from typing import List
from fastapi import APIRouter
from app.schemas.review_schema import TopicCluster
from app.ml.model_engine import model_engine

router = APIRouter()

@router.get("/topics", response_model=List[TopicCluster])
def get_topics():
    """
    Returns the 5 unsupervised LDA topic modeling clusters:
    - Topic Name & Description
    - Share percentage & review volume
    - Average rating correlation
    - Financial churn risk multiplier
    - Coherence Score (C_v)
    - Top 10 extracted keywords with relative weights
    """
    return model_engine.get_topics()
