"""Configuration settings for Enterprise Brand Reputation & Text Mining Intelligence Platform."""

from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "Enterprise Brand Reputation & Text Mining Intelligence Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ACADEMIC_AFFILIATION: str = "IIT Roorkee - NPTEL Business Analytics & Text Mining"
    DEFAULT_CONFIDENCE_THRESHOLD: float = 0.65
    HIGH_URGENCY_KEYWORDS: list[str] = [
        "refund", "lawsuit", "sue", "court", "broken on arrival", "dead on arrival",
        "fraud", "scam", "cheat", "dispute", "chargeback", "terrible support",
        "horrible service", "fire hazard", "exploded", "defective", "shattered",
        "stolen", "counterfeit", "fake", "unacceptable"
    ]

settings = Settings()
