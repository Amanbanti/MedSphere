from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.diagnosis import DiagnosisAssistRequest, DiagnosisAssistResponse
from app.services.diagnosis_service import DiagnosisAssistService

router = APIRouter()
service = DiagnosisAssistService()


@router.post("/assist", response_model=ApiResponse[DiagnosisAssistResponse])
async def assist_diagnosis(
    body: DiagnosisAssistRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[DiagnosisAssistResponse]:
    result = service.assist(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
