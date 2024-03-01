from __future__ import annotations

import math

from app.schemas.risk import RiskFactorScore, RiskPredictionRequest, RiskPredictionResponse

MODEL_BASELINES: dict[str, float] = {
    "readmission": 0.18,
    "sepsis": 0.07,
    "fall": 0.12,
    "cardiovascular": 0.15,
}


class RiskPredictionService:
    def predict(self, request: RiskPredictionRequest) -> RiskPredictionResponse:
        baseline = MODEL_BASELINES.get(request.risk_model, 0.1)
        factors: list[RiskFactorScore] = []

        age_factor = min(0.35, request.patient.age_years / 200)
        factors.append(RiskFactorScore(factor="age", weight=0.25, contribution=age_factor))

        comorbidity_factor = min(0.4, len(request.patient.chronic_conditions) * 0.06)
        factors.append(
            RiskFactorScore(factor="comorbidity_count", weight=0.3, contribution=comorbidity_factor)
        )

        feature_sum = sum(request.features.values()) * 0.01
        factors.append(RiskFactorScore(factor="custom_features", weight=0.2, contribution=feature_sum))

        raw = baseline + sum(f.contribution * f.weight for f in factors)
        score = max(0.01, min(0.99, 1 - math.exp(-raw * 3)))

        band = "low" if score < 0.25 else "moderate" if score < 0.55 else "high"
        interventions = self._interventions(request.risk_model, band)

        return RiskPredictionResponse(
            risk_model=request.risk_model,
            score=round(score, 4),
            risk_band=band,
            factors=factors,
            interventions=interventions,
        )

    @staticmethod
    def _interventions(model: str, band: str) -> list[str]:
        if band == "low":
            return ["Continue standard care pathway"]
        if model == "readmission":
            return ["Schedule early follow-up", "Medication reconciliation", "Patient education"]
        if model == "sepsis":
            return ["Escalate monitoring", "Review infection source", "Consider sepsis bundle"]
        if model == "fall":
            return ["Mobility assessment", "Home safety review", "Medication sedative review"]
        return ["Intensify preventive cardiology follow-up"]
