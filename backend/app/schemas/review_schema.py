"""Pydantic schemas for requests, responses, and metrics."""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=2, max_length=5000, description="Raw customer review text to analyze")
    product_category: Optional[str] = Field("Electronics", description="Category of the product")
    rating_override: Optional[int] = Field(None, ge=1, le=5, description="Optional star rating")

class KeywordWeight(BaseModel):
    word: str
    weight: float

class PreprocessingDetails(BaseModel):
    original_text: str
    normalized_text: str
    tokens: List[str]
    lemmas: List[str]
    preserved_negations: List[str]

class AnalyzeResponse(BaseModel):
    sentiment: str = Field(..., description="Positive, Neutral, or Negative")
    sentiment_score: float = Field(..., description="Confidence score between 0.0 and 1.0")
    probabilities: Dict[str, float] = Field(..., description="Probabilities for each class")
    urgency_level: str = Field(..., description="High, Medium, or Low")
    is_urgent_escalation: bool = Field(..., description="True if immediate churn / legal risk")
    urgency_triggers: List[str] = Field(default_factory=list, description="Keywords triggering high urgency")
    topic_id: int
    topic_name: str
    topic_probability: float
    extracted_ngrams: List[str] = Field(default_factory=list)
    action_recommendation: str
    churn_risk_level: str
    preprocessing: PreprocessingDetails

class ReviewRecord(BaseModel):
    id: str
    date: str
    user_name: str
    product_name: str
    category: str
    rating: int
    review_title: str
    review_body: str
    verified_purchase: bool
    sentiment: str
    is_urgent: bool
    topic_name: str
    helpful_votes: int
    price: float

class ReviewCreate(BaseModel):
    product_name: str = "DSM Pro Wireless Headphone"
    category: str = "Electronics"
    rating: int = Field(..., ge=1, le=5)
    review_title: str = "Review Title"
    review_body: str = Field(..., min_length=5)
    verified_purchase: bool = True
    user_name: Optional[str] = "Verified Customer"

class KPISummary(BaseModel):
    total_reviews: int
    net_sentiment_score: float
    positive_percentage: float
    neutral_percentage: float
    negative_percentage: float
    average_rating: float
    high_urgency_count: int
    high_urgency_rate: float
    estimated_churn_arr_risk: float
    topic_count: int
    top_complaint_topic: str

class TopicCluster(BaseModel):
    topic_id: int
    name: str
    share_percentage: float
    review_count: int
    avg_rating: float
    churn_multiplier: float
    coherence_score: float
    top_keywords: List[KeywordWeight]
    description: str

class TrendPoint(BaseModel):
    month: str
    positive_count: int
    neutral_count: int
    negative_count: int
    total_count: int
    net_sentiment_score: float
    avg_rating: float

class ConfusionMatrixData(BaseModel):
    labels: List[str]
    matrix: List[List[int]]
    precision: Dict[str, float]
    recall: Dict[str, float]
    f1_score: Dict[str, float]
    macro_f1: float
    overall_accuracy: float

class ModelBenchmark(BaseModel):
    model_name: str
    accuracy: float
    macro_f1: float
    precision: float
    recall: float
    inference_latency_ms: float
    artifact_size_kb: float
    status: str
