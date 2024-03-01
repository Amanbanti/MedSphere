from __future__ import annotations

import re

from app.schemas.report import ReportSummarizeRequest, ReportSummarizeResponse


class ReportSummarizationService:
    def summarize(self, request: ReportSummarizeRequest) -> ReportSummarizeResponse:
        sentences = [s.strip() for s in re.split(r"[.!?]+", request.report_text) if s.strip()]
        ranked = sorted(sentences, key=len, reverse=True)
        key_findings = ranked[: max(3, request.max_bullet_points // 2)]
        action_items = self._extract_action_items(request.report_text)
        summary = ". ".join(key_findings[:3]) + "."

        patient_summary = None
        if request.audience == "patient":
            patient_summary = self._patient_friendly(summary)

        return ReportSummarizeResponse(
            summary=summary,
            key_findings=key_findings,
            action_items=action_items,
            patient_friendly_summary=patient_summary,
        )

    @staticmethod
    def _extract_action_items(text: str) -> list[str]:
        patterns = [
            r"(?:recommend|continue|start|follow up|monitor)[^.!?]*[.!?]",
            r"(?:prescribe|refer|schedule)[^.!?]*[.!?]",
        ]
        items: list[str] = []
        for pattern in patterns:
            for match in re.finditer(pattern, text, flags=re.I):
                cleaned = match.group(0).strip()
                if cleaned and cleaned not in items:
                    items.append(cleaned)
        return items[:8] or ["Review full report for complete care plan"]

    @staticmethod
    def _patient_friendly(summary: str) -> str:
        replacements = {
            "myocardial infarction": "heart attack",
            "hypertension": "high blood pressure",
            "dyspnea": "shortness of breath",
        }
        result = summary
        for clinical, plain in replacements.items():
            result = re.sub(clinical, plain, result, flags=re.I)
        return result
