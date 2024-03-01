from pydantic import BaseModel, Field

from app.schemas.common import PatientContext


class DiagnosisAssistRequest(BaseModel):
    patient: PatientContext
    symptoms: list[str] = Field(min_length=1, max_length=32)
    vitals: dict[str, float] = Field(default_factory=dict)
    free_text_notes: str = ""


class DiagnosisCandidate(BaseModel):
    condition: str
    icd10_hint: str
    confidence: float = Field(ge=0.0, le=1.0)
    rationale: str
    recommended_tests: list[str] = Field(default_factory=list)


class DiagnosisAssistResponse(BaseModel):
    candidates: list[DiagnosisCandidate]
    red_flags: list[str] = Field(default_factory=list)
    follow_up_questions: list[str] = Field(default_factory=list)
