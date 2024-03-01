from pydantic import BaseModel, Field

from app.schemas.common import PatientContext


class RiskPredictionRequest(BaseModel):
    patient: PatientContext
    risk_model: str = Field(description="readmission|sepsis|fall|cardiovascular")
    observation_window_days: int = Field(default=30, ge=1, le=365)
    features: dict[str, float] = Field(default_factory=dict)


class RiskFactorScore(BaseModel):
    factor: str
    weight: float
    contribution: float


class RiskPredictionResponse(BaseModel):
    risk_model: str
    score: float = Field(ge=0.0, le=1.0)
    risk_band: str
    factors: list[RiskFactorScore]
    interventions: list[str] = Field(default_factory=list)
