from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T
    correlation_id: str | None = None


class PatientContext(BaseModel):
    patient_id: str
    age_years: int = Field(ge=0, le=130)
    sex: str = Field(pattern="^(M|F|O|U)$")
    allergies: list[str] = Field(default_factory=list)
    chronic_conditions: list[str] = Field(default_factory=list)
    current_medications: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)


class CdsAlert(BaseModel):
    rule_id: str
    severity: str
    title: str
    message: str
    recommendation: str | None = None
    evidence: list[str] = Field(default_factory=list)


class CdsEvaluationRequest(BaseModel):
    patient_facts: dict[str, Any] = Field(default_factory=dict)
    clinical_facts: dict[str, Any] = Field(default_factory=dict)


class CdsEvaluationResponse(BaseModel):
    alerts: list[CdsAlert]
    rules_evaluated: int
