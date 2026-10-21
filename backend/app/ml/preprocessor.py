"""Text Normalization & Preprocessing Engine for Text Mining.
Implements Phase 1 specifications:
- Contraction expansion
- HTML & URL stripping
- Business stop-word filtering with negation preservation ('not', 'never', 'bad', etc.)
- Tokenization and rule-based lemmatization
"""

import re
from typing import List, Tuple, Set

# Common English contractions mapping
CONTRACTIONS_MAP = {
    "won't": "will not",
    "can't": "cannot",
    "cannot": "cannot",
    "n't": " not",
    "'re": " are",
    "'s": " is",
    "'d": " would",
    "'ll": " will",
    "'t": " not",
    "'ve": " have",
    "'m": " am",
    "don't": "do not",
    "doesn't": "does not",
    "didn't": "did not",
    "isn't": "is not",
    "aren't": "are not",
    "wasn't": "was not",
    "weren't": "were not",
    "haven't": "have not",
    "hasn't": "has not",
    "hadn't": "had not",
    "wouldn't": "would not",
    "shouldn't": "should not",
    "couldn't": "could not"
}

# Standard English stop words
STANDARD_STOP_WORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
    "any", "are", "as", "at", "be", "because", "been", "before", "being", "below",
    "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down",
    "during", "each", "few", "for", "from", "further", "had", "has", "have",
    "having", "he", "her", "here", "hers", "herself", "him", "himself", "his",
    "how", "i", "if", "in", "into", "is", "it", "its", "itself", "me", "more",
    "most", "my", "myself", "of", "off", "on", "once", "only", "or", "other",
    "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she",
    "should", "so", "some", "such", "than", "that", "the", "their", "theirs",
    "them", "themselves", "then", "there", "these", "they", "this", "those",
    "through", "to", "too", "under", "until", "up", "very", "was", "we", "were",
    "what", "when", "where", "which", "while", "who", "whom", "why", "with",
    "you", "your", "yours", "yourself", "yourselves"
}

# CRITICAL BUSINESS EXCEPTIONS: Keep these words to preserve negation & sentiment nuance!
BUSINESS_STOPWORD_EXCEPTIONS = {
    "not", "never", "no", "nor", "none", "neither", "barely", "hardly", "scarcely",
    "bad", "worst", "broken", "against", "cannot", "without", "nothing", "nowhere"
}

# Active stop words set
FILTERED_STOP_WORDS = STANDARD_STOP_WORDS - BUSINESS_STOPWORD_EXCEPTIONS

# Lemmatization normalization dictionary for common customer feedback domains
LEMMA_DICT = {
    "batteries": "battery",
    "charging": "charge",
    "charges": "charge",
    "charged": "charge",
    "charger": "charger",
    "chargers": "charger",
    "dies": "die",
    "dying": "die",
    "died": "die",
    "dead": "dead",
    "broken": "break",
    "breaking": "break",
    "breaks": "break",
    "dropped": "drop",
    "dropping": "drop",
    "drops": "drop",
    "cracked": "crack",
    "cracking": "crack",
    "cracks": "crack",
    "crashed": "crash",
    "crashing": "crash",
    "crashes": "crash",
    "disconnecting": "disconnect",
    "disconnected": "disconnect",
    "disconnects": "disconnect",
    "disconnections": "disconnect",
    "refunded": "refund",
    "refunds": "refund",
    "refunding": "refund",
    "shipped": "ship",
    "shipping": "ship",
    "delivered": "deliver",
    "delivering": "deliver",
    "deliveries": "delivery",
    "packaged": "package",
    "packaging": "package",
    "packages": "package",
    "arrived": "arrive",
    "arriving": "arrive",
    "arrives": "arrive",
    "purchased": "purchase",
    "purchasing": "purchase",
    "purchases": "purchase",
    "bought": "buy",
    "buying": "buy",
    "buys": "buy",
    "working": "work",
    "worked": "work",
    "works": "work",
    "connecting": "connect",
    "connected": "connect",
    "connects": "connect",
    "connections": "connect",
    "scammed": "scam",
    "scams": "scam",
    "disputing": "dispute",
    "disputed": "dispute",
    "disputes": "dispute",
    "defective": "defect",
    "defects": "defect",
    "flawed": "flaw",
    "flaws": "flaw",
    "improved": "improve",
    "improving": "improve",
    "improves": "improve",
    "loved": "love",
    "loving": "love",
    "loves": "love",
    "liked": "like",
    "liking": "like",
    "likes": "like",
    "hated": "hate",
    "hating": "hate",
    "hates": "hate",
    "failed": "fail",
    "failing": "fail",
    "fails": "fail",
    "failure": "fail",
    "failures": "fail",
    "complained": "complain",
    "complaining": "complain",
    "complains": "complain",
    "complaints": "complain"
}


class TextPreprocessor:
    """Preprocesses raw text into normalized tokens and lemmas."""

    def __init__(self):
        self.stop_words = FILTERED_STOP_WORDS

    def expand_contractions(self, text: str) -> str:
        """Expands contractions like don't -> do not."""
        for contraction, expansion in CONTRACTIONS_MAP.items():
            pattern = re.compile(re.escape(contraction), re.IGNORECASE)
            text = pattern.sub(expansion, text)
        return text

    def clean_special_characters(self, text: str) -> str:
        """Removes HTML tags, URLs, and non-alphanumeric symbols except punctuation spacing."""
        # Remove HTML tags
        text = re.sub(r"<[^>]+>", " ", text)
        # Remove URLs
        text = re.sub(r"http\S+|www\.\S+", " ", text)
        # Remove special characters but keep letters, numbers, and basic spaces
        text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
        # Collapse multiple spaces
        text = re.sub(r"\s+", " ", text).strip()
        return text

    def lemmatize_token(self, token: str) -> str:
        """Applies domain-specific rule lemmatization."""
        token_lower = token.lower()
        if token_lower in LEMMA_DICT:
            return LEMMA_DICT[token_lower]
        # Basic suffix stripping if longer than 4 chars
        if token_lower.endswith("ing") and len(token_lower) > 5:
            return token_lower[:-3]
        if token_lower.endswith("ed") and len(token_lower) > 4:
            return token_lower[:-2]
        if token_lower.endswith("s") and len(token_lower) > 4 and not token_lower.endswith("ss"):
            return token_lower[:-1]
        return token_lower

    def preprocess(self, text: str) -> Tuple[str, List[str], List[str], List[str]]:
        """
        Full pipeline:
        Returns:
            normalized_text: str
            tokens: List[str]
            lemmas: List[str]
            preserved_negations: List[str]
        """
        if not text or not text.strip():
            return "", [], [], []

        # 1. Lowercase
        raw_lower = text.lower()

        # 2. Expand contractions
        expanded = self.expand_contractions(raw_lower)

        # 3. Clean special chars & HTML
        cleaned = self.clean_special_characters(expanded)

        # 4. Tokenize
        raw_tokens = [t for t in cleaned.split() if len(t) > 1]

        # 5. Filter stop-words (with business negation exceptions)
        filtered_tokens = []
        preserved_negations = []

        for token in raw_tokens:
            if token in BUSINESS_STOPWORD_EXCEPTIONS:
                preserved_negations.append(token)
                filtered_tokens.append(token)
            elif token not in self.stop_words:
                filtered_tokens.append(token)

        # 6. Lemmatize
        lemmas = [self.lemmatize_token(t) for t in filtered_tokens]

        # Normalized string for TF-IDF vectorizer
        normalized_text = " ".join(lemmas)

        return normalized_text, filtered_tokens, lemmas, preserved_negations


# Singleton instance
preprocessor = TextPreprocessor()
