from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.risk import RiskPredictionRequest, RiskPredictionResponse
from app.services.risk_prediction_service import RiskPredictionService

router = APIRouter()
service = RiskPredictionService()


@router.post("/predict", response_model=ApiResponse[RiskPredictionResponse])
async def predict_risk(
    body: RiskPredictionRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[RiskPredictionResponse]:
    result = service.predict(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
