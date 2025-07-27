# Phase 6 — AI Diagnosis, CDS & Analytics

## Scope

| Component | Path | Purpose |
|-----------|------|---------|
| Diagnosis AI (FastAPI) | `services/diagnosis-ai` | Clinical AI microservice |
| CDS engine | `app/services/cds_engine.py` | Rule evaluation from shared CDS JSON |
| Analytics | `services/analytics`, `apps/analytics` | Operational intelligence |
| Shared CDS | `packages/shared/src/cds` | TypeScript rule definitions |

## Diagnosis AI Service

FastAPI routers:

| Route prefix | Capability |
|--------------|------------|
| `/api/v1/diagnosis` | Symptom-based differential assist |
| `/api/v1/drug-interactions` | Interaction screening |
| `/api/v1/risk` | Risk prediction scores |
| `/api/v1/icd10` | ICD-10 coding suggestions |
| `/api/v1/reports` | Report summarization |
| `/api/v1/cds` | Clinical decision support evaluation |
| `/api/v1/imaging` | Image classification pipeline |

### CDS Engine

Loads rule parts from `services/diagnosis-ai/src/rules/*.json` (mirrors `packages/shared/src/cds/rules`). Evaluates patient/clinical facts and returns ranked alerts with severity.

### Image Classification

`ChestXRayClassifier` (`torch.nn.Module`) loads optional weights from `DIAGNOSIS_AI_IMAGE_WEIGHTS_PATH`. Without weights, deterministic hash-based scoring runs for dev/test.

### Deployment

```bash
docker build -t medsphere/diagnosis-ai services/diagnosis-ai
```

Dependencies listed in `requirements.txt` (not installed in CI codegen).

## Analytics

- **Backend:** `services/analytics` — rollup jobs, KPI snapshots, Kafka consumption of domain events
- **Frontend:** `apps/analytics` — `useAnalyticsDashboard` hook with chart-ready series data
- **Worker:** `AnalyticsRollupJob`, `ReportExportJob`

## Testing

Python pytest suite:

- `tests/test_diagnosis_service.py`
- `tests/test_cds_engine.py`
- `tests/test_image_classification_service.py`

## Security

AI endpoints require gateway JWT. PHI minimization: requests carry coded identifiers only; full narratives stay in EMR service.
