from fastapi import APIRouter

from app.core.config import settings
from app.schemas.common import ApiResponse
from app.schemas.image_classification import ImageClassificationRequest, ImageClassificationResponse
from app.services.image_classification_service import ImageClassificationService

router = APIRouter()
_service = ImageClassificationService(weights_path=settings.image_weights_path)


@router.post("/classify", response_model=ApiResponse[ImageClassificationResponse])
def classify_image(request: ImageClassificationRequest) -> ApiResponse[ImageClassificationResponse]:
    result = _service.classify(request)
    return ApiResponse(data=result)
