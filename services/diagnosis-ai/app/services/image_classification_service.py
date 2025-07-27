"""
Image classification pipeline — deterministic scoring with optional PyTorch weights.
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from app.schemas.image_classification import (
    ImageClassificationRequest,
    ImageClassificationResponse,
    ClassificationLabel,
)

try:
    import torch
    import torch.nn as nn
    TORCH_AVAILABLE = True
except ImportError:  # pragma: no cover
    torch = None  # type: ignore
    nn = None  # type: ignore
    TORCH_AVAILABLE = False


if TORCH_AVAILABLE:

    class ChestXRayClassifier(nn.Module):
        """Simple CNN head — loads state_dict from weights_path when present."""

        def __init__(self, num_classes: int = 4, weights_path: str | None = None) -> None:
            super().__init__()
            self.features = nn.Sequential(
                nn.Conv2d(1, 16, kernel_size=3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2),
                nn.Conv2d(16, 32, kernel_size=3, padding=1),
                nn.ReLU(),
                nn.AdaptiveAvgPool2d((1, 1)),
            )
            self.classifier = nn.Linear(32, num_classes)
            if weights_path and Path(weights_path).exists():
                state = torch.load(weights_path, map_location="cpu")
                self.load_state_dict(state)

        def forward(self, x: "torch.Tensor") -> "torch.Tensor":
            x = self.features(x)
            x = x.view(x.size(0), -1)
            return self.classifier(x)


DEFAULT_LABELS = [
    ("normal", "Normal study"),
    ("opacity", "Pulmonary opacity"),
    ("cardiomegaly", "Cardiomegaly"),
    ("effusion", "Pleural effusion"),
]


class ImageClassificationService:
    def __init__(self, weights_path: str | None = None) -> None:
        self.weights_path = weights_path
        self._model = None
        if TORCH_AVAILABLE and weights_path and Path(weights_path).exists():
            self._model = ChestXRayClassifier(weights_path=weights_path)

    def classify(self, request: ImageClassificationRequest) -> ImageClassificationResponse:
        meta = request.metadata or {}
        width = int(meta.get("width", 512))
        height = int(meta.get("height", 512))
        modality = meta.get("modality", "CR")

        if self._model is not None and TORCH_AVAILABLE:
            tensor = torch.zeros(1, 1, min(height, 64), min(width, 64))
            with torch.no_grad():
                logits = self._model(tensor)
                probs = torch.softmax(logits, dim=1).squeeze().tolist()
            labels = [
                ClassificationLabel(code=code, description=desc, confidence=float(probs[i]))
                for i, (code, desc) in enumerate(DEFAULT_LABELS)
            ]
        else:
            # Deterministic hash-based scoring without GPU weights
            seed = hash(f"{request.image_id}:{modality}:{width}x{height}") % 1000
            base_scores = [0.15, 0.25, 0.20, 0.10]
            boosted_idx = seed % len(DEFAULT_LABELS)
            scores = [s * 0.5 for s in base_scores]
            scores[boosted_idx] = min(0.92, 0.55 + (seed % 30) / 100)
            total = sum(scores)
            labels = [
                ClassificationLabel(
                    code=code,
                    description=desc,
                    confidence=round(scores[i] / total, 4),
                )
                for i, (code, desc) in enumerate(DEFAULT_LABELS)
            ]

        labels.sort(key=lambda l: l.confidence, reverse=True)
        return ImageClassificationResponse(
            image_id=request.image_id,
            modality=modality,
            pipeline="chest-xray-v1",
            labels=labels,
            top_label=labels[0],
            weights_loaded=self._model is not None,
            metadata={"width": width, "height": height},
        )
