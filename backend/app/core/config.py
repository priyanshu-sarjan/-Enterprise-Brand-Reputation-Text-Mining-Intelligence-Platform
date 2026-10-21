"""Configuration settings for ReputeIQ Enterprise Brand Reputation & Text Mining Intelligence Platform."""

from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "Enterprise Brand Reputation & Text Mining Intelligence Platform"
    PLATFORM_NAME: str = "ReputeIQ"
    EDITION: str = "Enterprise Platform v2.4 Production"
    VERSION: str = "2.4.0"
    API_V1_STR: str = "/api/v1"
    DEFAULT_CONFIDENCE_THRESHOLD: float = 0.65
    HIGH_URGENCY_KEYWORDS: list[str] = [
        "refund", "lawsuit", "sue", "court", "broken on arrival", "dead on arrival",
        "fraud", "scam", "cheat", "dispute", "chargeback", "terrible support",
        "horrible service", "fire hazard", "exploded", "defective", "shattered",
        "stolen", "counterfeit", "fake", "unacceptable", "cancel", "damaged", "faulty"
    ]

settings = Settings()
