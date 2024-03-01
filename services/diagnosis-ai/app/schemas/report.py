from pydantic import BaseModel, Field


class ReportSummarizeRequest(BaseModel):
    report_text: str = Field(min_length=20)
    report_type: str = "discharge"
    audience: str = "clinician"
    max_bullet_points: int = Field(default=8, ge=3, le=20)


class ReportSummarizeResponse(BaseModel):
    summary: str
    key_findings: list[str]
    action_items: list[str]
    patient_friendly_summary: str | None = None
