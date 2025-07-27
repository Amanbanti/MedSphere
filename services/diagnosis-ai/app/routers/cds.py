from fastapi import APIRouter

from app.schemas.common import ApiResponse, CdsEvaluationRequest, CdsEvaluationResponse
from app.services.cds_engine import CdsEngine

router = APIRouter()
_engine = CdsEngine()


@router.post("/evaluate", response_model=ApiResponse[CdsEvaluationResponse])
def evaluate_cds(request: CdsEvaluationRequest) -> ApiResponse[CdsEvaluationResponse]:
    result = _engine.evaluate(request)
    return ApiResponse(data=result)


@router.get("/rules/count")
def rule_count() -> dict[str, int]:
    return {"count": _engine.rule_count}
