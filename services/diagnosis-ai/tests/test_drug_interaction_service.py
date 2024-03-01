from app.schemas.common import PatientContext
from app.schemas.drug_interaction import DrugInteractionRequest
from app.services.drug_interaction_service import DrugInteractionService


def test_detects_major_interaction():
    service = DrugInteractionService()
    request = DrugInteractionRequest(
        patient=PatientContext(
            patient_id="p1",
            age_years=70,
            sex="F",
            current_medications=["warfarin"],
        ),
        proposed_medication="aspirin",
    )
    response = service.evaluate(request)
    assert not response.safe_to_prescribe
    assert response.findings
