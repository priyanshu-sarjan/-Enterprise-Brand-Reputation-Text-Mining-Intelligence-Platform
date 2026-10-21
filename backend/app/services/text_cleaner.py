"""Text Cleaning & Normalization Service."""

import re

CONTRACTIONS = {
    "won't": "will not",
    "can't": "cannot",
    "n't": " not",
    "'re": " are",
    "'s": " is",
    "'d": " would",
    "'ll": " will",
    "don't": "do not",
    "doesn't": "does not",
    "didn't": "did not",
    "wasn't": "was not",
    "haven't": "have not"
}

def clean_text(raw_text: str) -> str:
    """Preprocesses raw customer review text."""
    if not raw_text:
        return ""
    text = raw_text.lower()
    for contraction, expansion in CONTRACTIONS.items():
        text = text.replace(contraction, expansion)
    # Remove HTML tags & URLs
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"http\S+|www\.\S+", " ", text)
    # Keep alphanumeric characters
    cleaned = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    return " ".join(cleaned.split())
