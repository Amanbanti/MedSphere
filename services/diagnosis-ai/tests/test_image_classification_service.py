from app.services.image_classification_service import ImageClassificationService
from app.schemas.image_classification import ImageClassificationRequest


def test_image_classification_deterministic_without_weights():
    svc = ImageClassificationService()
    req = ImageClassificationRequest(
        image_id="img-001",
        metadata={"width": 1024, "height": 1024, "modality": "CR"},
    )
    result = svc.classify(req)
    assert result.top_label.confidence > 0
    assert result.weights_loaded is False
    assert len(result.labels) == 4


def test_image_classification_same_input_same_top_label():
    svc = ImageClassificationService()
    req = ImageClassificationRequest(image_id="stable-id", metadata={"modality": "CR"})
    a = svc.classify(req)
    b = svc.classify(req)
    assert a.top_label.code == b.top_label.code
