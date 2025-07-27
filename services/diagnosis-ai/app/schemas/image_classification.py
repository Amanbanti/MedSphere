from pydantic import BaseModel, Field


class ClassificationLabel(BaseModel):
    code: str
    description: str
    confidence: float = Field(ge=0, le=1)


class ImageClassificationRequest(BaseModel):
    image_id: str
    metadata: dict | None = None


class ImageClassificationResponse(BaseModel):
    image_id: str
    modality: str
    pipeline: str
    labels: list[ClassificationLabel]
    top_label: ClassificationLabel
    weights_loaded: bool
    metadata: dict = Field(default_factory=dict)
