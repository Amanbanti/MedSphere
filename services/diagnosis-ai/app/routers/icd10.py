from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.icd10 import Icd10CodingRequest, Icd10CodingResponse
from app.services.icd10_service import Icd10CodingService

router = APIRouter()
service = Icd10CodingService()


@router.post("/code", response_model=ApiResponse[Icd10CodingResponse])
async def suggest_icd10_codes(
    body: Icd10CodingRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[Icd10CodingResponse]:
    result = service.code(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
