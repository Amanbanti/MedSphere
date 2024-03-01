from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.drug_interaction import DrugInteractionRequest, DrugInteractionResponse
from app.services.drug_interaction_service import DrugInteractionService

router = APIRouter()
service = DrugInteractionService()


@router.post("/check", response_model=ApiResponse[DrugInteractionResponse])
async def check_interactions(
    body: DrugInteractionRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[DrugInteractionResponse]:
    result = service.evaluate(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
