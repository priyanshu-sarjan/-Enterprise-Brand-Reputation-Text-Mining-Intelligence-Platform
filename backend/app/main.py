"""Enterprise Brand Reputation & Text Mining Intelligence Platform - FastAPI Backend.
IIT Roorkee - NPTEL Business Analytics & Text Mining Project.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import predict, analytics, topics

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Full-stack NLP and Business Analytics platform for real-time brand reputation monitoring, sentiment classification, urgency triage, and LDA topic modeling.",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers under /api/v1
app.include_router(predict.router, prefix=settings.API_V1_STR, tags=["Real-Time NLP Prediction"])
app.include_router(analytics.router, prefix=settings.API_V1_STR, tags=["Business Analytics & KPIs"])
app.include_router(topics.router, prefix=settings.API_V1_STR, tags=["Topic Modeling (LDA)"])

@app.get("/")
def root():
    return {
        "status": "online",
        "platform": settings.PROJECT_NAME,
        "academic_affiliation": settings.ACADEMIC_AFFILIATION,
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "fastapi-text-mining-engine"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
