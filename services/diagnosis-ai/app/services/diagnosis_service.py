from __future__ import annotations

from app.schemas.diagnosis import (
    DiagnosisAssistRequest,
    DiagnosisAssistResponse,
    DiagnosisCandidate,
)

SYMPTOM_RULES: dict[str, list[tuple[str, str, float, str]]] = {
    "fever": [("Influenza", "J11.1", 0.62, "Acute febrile illness"), ("Sepsis", "A41.9", 0.41, "Systemic infection workup")],
    "chest pain": [("Angina pectoris", "I20.9", 0.58, "Cardiac ischemia evaluation"), ("GERD", "K21.9", 0.35, "Non-cardiac chest pain")],
    "shortness of breath": [("Acute heart failure", "I50.9", 0.55, "Evaluate volume status"), ("COPD exacerbation", "J44.1", 0.48, "Respiratory distress")],
    "headache": [("Migraine", "G43.909", 0.57, "Primary headache disorder"), ("Hypertensive urgency", "I16.0", 0.33, "Check blood pressure")],
    "abdominal pain": [("Appendicitis", "K35.80", 0.44, "RLQ pain and guarding"), ("Gastroenteritis", "A09", 0.52, "Acute GI symptoms")],
}

RED_FLAG_RULES: dict[str, list[str]] = {
    "chest pain": ["Consider acute coronary syndrome until proven otherwise"],
    "shortness of breath": ["Assess for hypoxia and hemodynamic instability"],
    "headache": ["Evaluate for thunderclap headache or neurologic deficits"],
}


class DiagnosisAssistService:
    def assist(self, request: DiagnosisAssistRequest) -> DiagnosisAssistResponse:
        normalized = [s.strip().lower() for s in request.symptoms if s.strip()]
        candidates: dict[str, DiagnosisCandidate] = {}
        red_flags: list[str] = []
        follow_up: list[str] = []

        for symptom in normalized:
            for condition, icd, confidence, rationale in SYMPTOM_RULES.get(symptom, []):
                boost = 0.05 if request.patient.age_years >= 65 else 0.0
                score = min(0.98, confidence + boost)
                existing = candidates.get(condition)
                if not existing or existing.confidence < score:
                    candidates[condition] = DiagnosisCandidate(
                        condition=condition,
                        icd10_hint=icd,
                        confidence=score,
                        rationale=rationale,
                        recommended_tests=self._recommended_tests(condition),
                    )
            red_flags.extend(RED_FLAG_RULES.get(symptom, []))

        if request.vitals.get("temperature_c", 37) >= 39:
            follow_up.append("Confirm infection source and hemodynamic status")
        if request.vitals.get("spo2", 100) < 92:
            red_flags.append("Hypoxemia detected — escalate respiratory assessment")

        ranked = sorted(candidates.values(), key=lambda c: c.confidence, reverse=True)[:5]
        if not ranked:
            ranked = [
                DiagnosisCandidate(
                    condition="Undifferentiated acute illness",
                    icd10_hint="R69",
                    confidence=0.31,
                    rationale="Insufficient pattern match — broaden workup",
                    recommended_tests=["CBC", "Basic metabolic panel"],
                )
            ]

        return DiagnosisAssistResponse(
            candidates=ranked,
            red_flags=list(dict.fromkeys(red_flags)),
            follow_up_questions=follow_up or ["Any recent travel or sick contacts?"],
        )

    @staticmethod
    def _recommended_tests(condition: str) -> list[str]:
        mapping = {
            "Angina pectoris": ["ECG", "Troponin"],
            "Sepsis": ["Blood cultures", "Lactate"],
            "Appendicitis": ["CBC", "Abdominal CT"],
            "Migraine": ["Neurologic exam"],
        }
        return mapping.get(condition, ["Targeted labs based on presentation"])
