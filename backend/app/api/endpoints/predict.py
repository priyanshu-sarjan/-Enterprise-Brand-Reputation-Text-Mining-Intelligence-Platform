"""Real-time text prediction endpoint."""

from fastapi import APIRouter, HTTPException
from app.schemas.review_schema import AnalyzeRequest, AnalyzeResponse
from app.ml.model_engine import model_engine

router = APIRouter()

@router.post("/analyze-text", response_model=AnalyzeResponse)
def analyze_text(request: AnalyzeRequest):
    """
    Accepts raw customer review text.
    Returns:
    - Sentiment label (Positive, Neutral, Negative)
    - Confidence probability score
    - Urgency escalation flag (refund, lawsuit, broken on arrival, fraud)
    - Matched root cause topic cluster (LDA)
    - Extracted n-grams and tokens
    - Recommended mitigation action
    - Preprocessing traces (negation preservation, lemmatization)
    """
    try:
        result = model_engine.analyze_text(
            text=request.text,
            product_category=request.product_category or "Electronics",
            rating_override=request.rating_override
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failure: {str(e)}")
