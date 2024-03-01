from __future__ import annotations

import re

from app.schemas.icd10 import Icd10CodeSuggestion, Icd10CodingRequest, Icd10CodingResponse

KEYWORD_MAP: list[tuple[re.Pattern[str], str, str, float]] = [
    (re.compile(r"\btype 2 diabetes\b", re.I), "E11.9", "Type 2 diabetes mellitus without complications", 0.86),
    (re.compile(r"\bhypertension\b", re.I), "I10", "Essential (primary) hypertension", 0.82),
    (re.compile(r"\bcopd\b", re.I), "J44.9", "Chronic obstructive pulmonary disease, unspecified", 0.8),
    (re.compile(r"\batrial fibrillation\b", re.I), "I48.91", "Unspecified atrial fibrillation", 0.84),
    (re.compile(r"\back pain\b", re.I), "M54.9", "Dorsalgia, unspecified", 0.7),
    (re.compile(r"\buti\b|urinary tract infection", re.I), "N39.0", "Urinary tract infection, site not specified", 0.78),
]


class Icd10CodingService:
    def code(self, request: Icd10CodingRequest) -> Icd10CodingResponse:
        suggestions: list[Icd10CodeSuggestion] = []
        for pattern, code, description, confidence in KEYWORD_MAP:
            if pattern.search(request.clinical_text):
                suggestions.append(
                    Icd10CodeSuggestion(
                        code=code,
                        description=description,
                        confidence=confidence,
                        is_primary=False,
                    )
                )

        suggestions.sort(key=lambda s: s.confidence, reverse=True)
        primary = None
        secondary: list[Icd10CodeSuggestion] = []
        if suggestions:
            primary = suggestions[0].model_copy(update={"is_primary": True})
            secondary = suggestions[1:5]

        gaps: list[str] = []
        if not re.search(r"\b(onset|duration|severity)\b", request.clinical_text, re.I):
            gaps.append("Document symptom onset and severity for higher coding specificity")
        if request.encounter_type == "inpatient" and not re.search(r"\b(admit|admission)\b", request.clinical_text, re.I):
            gaps.append("Inpatient note should include admission reason")

        return Icd10CodingResponse(primary=primary, secondary=secondary, documentation_gaps=gaps)
