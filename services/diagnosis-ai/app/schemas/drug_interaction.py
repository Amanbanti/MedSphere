from pydantic import BaseModel, Field

from app.schemas.common import PatientContext


class DrugInteractionRequest(BaseModel):
    patient: PatientContext
    proposed_medication: str
    additional_medications: list[str] = Field(default_factory=list)


class InteractionFinding(BaseModel):
    drug_a: str
    drug_b: str
    severity: str
    mechanism: str
    recommendation: str
    confidence: float = Field(ge=0.0, le=1.0)


class DrugInteractionResponse(BaseModel):
    findings: list[InteractionFinding]
    safe_to_prescribe: bool
    summary: str
