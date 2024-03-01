from pydantic import BaseModel, Field


class Icd10CodingRequest(BaseModel):
    clinical_text: str = Field(min_length=10)
    encounter_type: str = "outpatient"
    specialty: str | None = None


class Icd10CodeSuggestion(BaseModel):
    code: str
    description: str
    confidence: float = Field(ge=0.0, le=1.0)
    is_primary: bool = False


class Icd10CodingResponse(BaseModel):
    primary: Icd10CodeSuggestion | None
    secondary: list[Icd10CodeSuggestion] = Field(default_factory=list)
    documentation_gaps: list[str] = Field(default_factory=list)
