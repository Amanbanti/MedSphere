from app.schemas.common import PatientContext
from app.schemas.diagnosis import DiagnosisAssistRequest
from app.services.diagnosis_service import DiagnosisAssistService


def test_diagnosis_assist_returns_candidates():
    service = DiagnosisAssistService()
    request = DiagnosisAssistRequest(
        patient=PatientContext(patient_id="p1", age_years=45, sex="M"),
        symptoms=["fever", "headache"],
        vitals={"temperature_c": 39.2},
    )
    response = service.assist(request)
    assert response.candidates
    assert response.candidates[0].confidence > 0
