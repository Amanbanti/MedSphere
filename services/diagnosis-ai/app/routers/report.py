from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.report import ReportSummarizeRequest, ReportSummarizeResponse
from app.services.report_summarization_service import ReportSummarizationService

router = APIRouter()
service = ReportSummarizationService()


@router.post("/summarize", response_model=ApiResponse[ReportSummarizeResponse])
async def summarize_report(
    body: ReportSummarizeRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[ReportSummarizeResponse]:
    result = service.summarize(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
