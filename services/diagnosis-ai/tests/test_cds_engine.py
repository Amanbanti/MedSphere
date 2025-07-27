from app.services.cds_engine import CdsEngine
from app.schemas.common import CdsEvaluationRequest


def test_cds_engine_evaluates_hyperkalemia():
    engine = CdsEngine()
    result = engine.evaluate(
        CdsEvaluationRequest(clinical_facts={"potassium_mmol_l": 6.1})
    )
    assert any(a.rule_id == "hyperkalemia-screen" for a in result.alerts)


def test_cds_engine_rule_count_non_negative():
    engine = CdsEngine()
    assert engine.rule_count >= 0
