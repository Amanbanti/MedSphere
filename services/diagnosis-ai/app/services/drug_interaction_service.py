from __future__ import annotations

from app.core.config import settings
from app.schemas.drug_interaction import (
    DrugInteractionRequest,
    DrugInteractionResponse,
    InteractionFinding,
)

KNOWN_INTERACTIONS: dict[frozenset[str], tuple[str, str, str, float]] = {
    frozenset({"warfarin", "aspirin"}): (
        "major",
        "Additive anticoagulant effect increases bleeding risk",
        "Avoid combination unless strictly indicated; monitor INR and signs of bleeding",
        0.91,
    ),
    frozenset({"simvastatin", "clarithromycin"}): (
        "major",
        "CYP3A4 inhibition raises statin levels",
        "Suspend simvastatin during clarithromycin course or select alternative antibiotic",
        0.88,
    ),
    frozenset({"metformin", "contrast dye"}): (
        "moderate",
        "Risk of lactic acidosis with acute kidney injury",
        "Hold metformin per protocol after iodinated contrast",
        0.76,
    ),
    frozenset({"lisinopril", "potassium"}): (
        "moderate",
        "Hyperkalemia risk with ACE inhibitor",
        "Monitor serum potassium within 1 week",
        0.73,
    ),
}


class DrugInteractionService:
    def evaluate(self, request: DrugInteractionRequest) -> DrugInteractionResponse:
        meds = {
            m.strip().lower()
            for m in [
                *request.patient.current_medications,
                *request.additional_medications,
                request.proposed_medication,
            ]
            if m.strip()
        }

        findings: list[InteractionFinding] = []
        for pair, (severity, mechanism, recommendation, confidence) in KNOWN_INTERACTIONS.items():
            if pair.issubset(meds) and confidence >= settings.interaction_confidence_threshold:
                drugs = sorted(pair)
                findings.append(
                    InteractionFinding(
                        drug_a=drugs[0],
                        drug_b=drugs[1],
                        severity=severity,
                        mechanism=mechanism,
                        recommendation=recommendation,
                        confidence=confidence,
                    )
                )

        allergy_hits = [
            allergen
            for allergen in request.patient.allergies
            if allergen.lower() in request.proposed_medication.lower()
        ]
        if allergy_hits:
            findings.append(
                InteractionFinding(
                    drug_a=request.proposed_medication,
                    drug_b=allergy_hits[0],
                    severity="contraindicated",
                    mechanism="Documented allergy overlap",
                    recommendation="Do not prescribe; select alternative agent",
                    confidence=0.99,
                )
            )

        safe = not any(f.severity in {"major", "contraindicated"} for f in findings)
        summary = (
            "No major interactions detected at configured threshold"
            if safe
            else "Potential interactions require pharmacist or physician review"
        )
        return DrugInteractionResponse(findings=findings, safe_to_prescribe=safe, summary=summary)
