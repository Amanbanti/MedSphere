"""
Clinical Decision Support engine — evaluates rules from packages/shared CDS definitions.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from app.schemas.common import CdsEvaluationRequest, CdsEvaluationResponse, CdsAlert


class CdsEngine:
    def __init__(self, rules_dir: Path | None = None) -> None:
        base = rules_dir or Path(__file__).resolve().parents[2] / "src" / "rules"
        self._rules: list[dict[str, Any]] = []
        index_path = base / "index.json"
        if index_path.exists():
            manifest = json.loads(index_path.read_text(encoding="utf-8"))
            for part in manifest.get("parts", []):
                part_path = base / part
                if part_path.exists():
                    data = json.loads(part_path.read_text(encoding="utf-8"))
                    self._rules.extend(data.get("rules", []))

    @property
    def rule_count(self) -> int:
        return len(self._rules)

    def evaluate(self, request: CdsEvaluationRequest) -> CdsEvaluationResponse:
        alerts: list[CdsAlert] = []
        facts = {**request.patient_facts, **request.clinical_facts}

        for rule in self._rules:
            if not rule.get("enabled", True):
                continue
            if self._matches(rule.get("conditions", []), facts):
                alerts.append(
                    CdsAlert(
                        rule_id=rule.get("id", "unknown"),
                        severity=rule.get("severity", "info"),
                        title=rule.get("title", "Clinical alert"),
                        message=rule.get("message", ""),
                        recommendation=rule.get("recommendation"),
                        evidence=rule.get("evidence", []),
                    )
                )

        # Deterministic fallback alerts from common fact patterns
        if facts.get("potassium_mmol_l", 4) > 5.5:
            alerts.append(
                CdsAlert(
                    rule_id="hyperkalemia-screen",
                    severity="critical",
                    title="Hyperkalemia",
                    message="Potassium exceeds 5.5 mmol/L",
                    recommendation="Repeat lab, ECG, consider treatment per protocol",
                    evidence=["potassium_mmol_l"],
                )
            )

        deduped = {a.rule_id: a for a in alerts}
        ranked = sorted(deduped.values(), key=lambda a: {"critical": 0, "warning": 1, "info": 2}.get(a.severity, 3))
        return CdsEvaluationResponse(alerts=ranked[:20], rules_evaluated=self.rule_count)

    @staticmethod
    def _matches(conditions: list[dict[str, Any]], facts: dict[str, Any]) -> bool:
        if not conditions:
            return False
        for cond in conditions:
            field = cond.get("field")
            op = cond.get("operator", "eq")
            expected = cond.get("value")
            actual = facts.get(field)
            if actual is None:
                return False
            if op == "eq" and actual != expected:
                return False
            if op == "gt" and not (actual > expected):
                return False
            if op == "gte" and not (actual >= expected):
                return False
            if op == "lt" and not (actual < expected):
                return False
            if op == "in" and actual not in expected:
                return False
        return True
