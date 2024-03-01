import { writeGenerated, ensureDir } from './nest-templates.mjs';

export async function generateConfigPresets(repoRoot, stats) {
  const files = {
    'packages/config/src/typescript/base.json': JSON.stringify(
      {
        $schema: 'https://json.schemastore.org/tsconfig',
        compilerOptions: {
          target: 'ES2022',
          module: 'commonjs',
          lib: ['ES2022'],
          moduleResolution: 'node',
          declaration: true,
          declarationMap: true,
          sourceMap: true,
          strict: true,
          noImplicitAny: true,
          strictNullChecks: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          forceConsistentCasingInFileNames: true,
          skipLibCheck: true,
          resolveJsonModule: true,
          isolatedModules: true,
          incremental: true,
        },
        exclude: ['node_modules', 'dist', 'coverage'],
      },
      null,
      2,
    ),
    'packages/config/src/eslint/base.js': `/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  ignorePatterns: ['dist', 'coverage', 'node_modules', '*.js'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
`,
    'packages/config/src/jest/base.js': `/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\\\.spec\\\\.ts$',
  transform: {
    '^.+\\\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/**/*.module.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  passWithNoTests: true,
};
`,
    'packages/config/src/tailwind/base.ts': `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f1ff',
          500: '#0b84de',
          600: '#0068b8',
          700: '#005394',
          900: '#0a3457',
        },
        clinical: {
          success: '#16a34a',
          warning: '#d97706',
          danger: '#dc2626',
          info: '#0284c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
`,
    'packages/config/src/prettier/index.js': `/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'always',
  endOfLine: 'lf',
};
`,
    'packages/config/src/index.ts': `/**
 * @medsphere/config — shared tooling presets for MedSphere monorepo.
 */

export const TYPESCRIPT_BASE = './typescript/base.json';
export const ESLINT_BASE = './eslint/base.js';
export const JEST_BASE = './jest/base.js';
export const TAILWIND_BASE = './tailwind/base.ts';
export const PRETTIER_CONFIG = './prettier/index.js';
`,
  };

  for (const [rel, content] of Object.entries(files)) {
    await writeGenerated(repoRoot, rel, content.endsWith('\n') ? content : content + '\n', stats);
  }
}

export async function generateDiagnosisAi(repoRoot, stats) {
  const base = 'services/diagnosis-ai';
  const files = {
    [`${base}/requirements.txt`]: `fastapi==0.115.6
uvicorn[standard]==0.32.1
pydantic==2.10.3
pydantic-settings==2.6.1
httpx==0.28.1
python-multipart==0.0.20
numpy==2.2.1
scikit-learn==1.6.0
pytest==8.3.4
pytest-asyncio==0.25.0
`,
    [`${base}/pyproject.toml`]: `[project]
name = "medsphere-diagnosis-ai"
version = "0.1.0"
description = "MedSphere clinical AI assist service"
requires-python = ">=3.11"
dependencies = [
  "fastapi>=0.115",
  "uvicorn[standard]>=0.32",
  "pydantic>=2.10",
  "pydantic-settings>=2.6",
  "httpx>=0.28",
  "numpy>=2.2",
  "scikit-learn>=1.6",
]

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
`,
    [`${base}/README.md`]: `# MedSphere Diagnosis AI Service

FastAPI microservice providing clinical decision support: diagnosis assist, drug interaction checks, risk prediction, ICD-10 coding, and report summarization.
`,
    [`${base}/app/__init__.py`]: `"""MedSphere Diagnosis AI service package."""\n`,
    [`${base}/app/main.py`]: `from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging import configure_logging
from app.routers import diagnosis, drug_interaction, icd10, report, risk, health


@asynccontextmanager
async def lifespan(_: FastAPI):
    configure_logging(settings.service_name)
    yield


app = FastAPI(
    title="MedSphere Diagnosis AI",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1")
app.include_router(diagnosis.router, prefix="/api/v1/diagnosis", tags=["diagnosis"])
app.include_router(drug_interaction.router, prefix="/api/v1/drug-interactions", tags=["drug-interactions"])
app.include_router(risk.router, prefix="/api/v1/risk", tags=["risk"])
app.include_router(icd10.router, prefix="/api/v1/icd10", tags=["icd10"])
app.include_router(report.router, prefix="/api/v1/reports", tags=["reports"])
`,
    [`${base}/app/core/__init__.py`]: ``,
    [`${base}/app/core/config.py`]: `from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="DIAGNOSIS_AI_")

    service_name: str = "diagnosis-ai"
    host: str = "0.0.0.0"
    port: int = 8090
    cors_origins: list[str] = ["*"]
    log_level: str = "INFO"
    max_symptoms: int = 32
    interaction_confidence_threshold: float = 0.55


settings = Settings()
`,
    [`${base}/app/core/logging.py`]: `import logging
import sys


def configure_logging(service_name: str, level: str = "INFO") -> None:
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format=f"%(asctime)s %(levelname)s [{service_name}] %(name)s - %(message)s",
        stream=sys.stdout,
    )
`,
    [`${base}/app/core/exceptions.py`]: `from fastapi import HTTPException, status


class ClinicalValidationError(HTTPException):
    def __init__(self, detail: str) -> None:
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)


class InferenceError(HTTPException):
    def __init__(self, detail: str) -> None:
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)
`,
    [`${base}/app/schemas/__init__.py`]: `from app.schemas.common import ApiResponse, PatientContext
from app.schemas.diagnosis import DiagnosisAssistRequest, DiagnosisAssistResponse, DiagnosisCandidate
from app.schemas.drug_interaction import DrugInteractionRequest, DrugInteractionResponse, InteractionFinding
from app.schemas.risk import RiskPredictionRequest, RiskPredictionResponse, RiskFactorScore
from app.schemas.icd10 import Icd10CodingRequest, Icd10CodingResponse, Icd10CodeSuggestion
from app.schemas.report import ReportSummarizeRequest, ReportSummarizeResponse

__all__ = [
    "ApiResponse",
    "PatientContext",
    "DiagnosisAssistRequest",
    "DiagnosisAssistResponse",
    "DiagnosisCandidate",
    "DrugInteractionRequest",
    "DrugInteractionResponse",
    "InteractionFinding",
    "RiskPredictionRequest",
    "RiskPredictionResponse",
    "RiskFactorScore",
    "Icd10CodingRequest",
    "Icd10CodingResponse",
    "Icd10CodeSuggestion",
    "ReportSummarizeRequest",
    "ReportSummarizeResponse",
]
`,
    [`${base}/app/schemas/common.py`]: `from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T
    correlation_id: str | None = None


class PatientContext(BaseModel):
    patient_id: str
    age_years: int = Field(ge=0, le=130)
    sex: str = Field(pattern="^(M|F|O|U)$")
    allergies: list[str] = Field(default_factory=list)
    chronic_conditions: list[str] = Field(default_factory=list)
    current_medications: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)
`,
    [`${base}/app/schemas/diagnosis.py`]: `from pydantic import BaseModel, Field

from app.schemas.common import PatientContext


class DiagnosisAssistRequest(BaseModel):
    patient: PatientContext
    symptoms: list[str] = Field(min_length=1, max_length=32)
    vitals: dict[str, float] = Field(default_factory=dict)
    free_text_notes: str = ""


class DiagnosisCandidate(BaseModel):
    condition: str
    icd10_hint: str
    confidence: float = Field(ge=0.0, le=1.0)
    rationale: str
    recommended_tests: list[str] = Field(default_factory=list)


class DiagnosisAssistResponse(BaseModel):
    candidates: list[DiagnosisCandidate]
    red_flags: list[str] = Field(default_factory=list)
    follow_up_questions: list[str] = Field(default_factory=list)
`,
    [`${base}/app/schemas/drug_interaction.py`]: `from pydantic import BaseModel, Field

from app.schemas.common import PatientContext


class DrugInteractionRequest(BaseModel):
    patient: PatientContext
    proposed_medication: str
    additional_medications: list[str] = Field(default_factory=list)


class InteractionFinding(BaseModel):
    drug_a: str
    drug_b: str
    severity: str
    mechanism: str
    recommendation: str
    confidence: float = Field(ge=0.0, le=1.0)


class DrugInteractionResponse(BaseModel):
    findings: list[InteractionFinding]
    safe_to_prescribe: bool
    summary: str
`,
    [`${base}/app/schemas/risk.py`]: `from pydantic import BaseModel, Field

from app.schemas.common import PatientContext


class RiskPredictionRequest(BaseModel):
    patient: PatientContext
    risk_model: str = Field(description="readmission|sepsis|fall|cardiovascular")
    observation_window_days: int = Field(default=30, ge=1, le=365)
    features: dict[str, float] = Field(default_factory=dict)


class RiskFactorScore(BaseModel):
    factor: str
    weight: float
    contribution: float


class RiskPredictionResponse(BaseModel):
    risk_model: str
    score: float = Field(ge=0.0, le=1.0)
    risk_band: str
    factors: list[RiskFactorScore]
    interventions: list[str] = Field(default_factory=list)
`,
    [`${base}/app/schemas/icd10.py`]: `from pydantic import BaseModel, Field


class Icd10CodingRequest(BaseModel):
    clinical_text: str = Field(min_length=10)
    encounter_type: str = "outpatient"
    specialty: str | None = None


class Icd10CodeSuggestion(BaseModel):
    code: str
    description: str
    confidence: float = Field(ge=0.0, le=1.0)
    is_primary: bool = False


class Icd10CodingResponse(BaseModel):
    primary: Icd10CodeSuggestion | None
    secondary: list[Icd10CodeSuggestion] = Field(default_factory=list)
    documentation_gaps: list[str] = Field(default_factory=list)
`,
    [`${base}/app/schemas/report.py`]: `from pydantic import BaseModel, Field


class ReportSummarizeRequest(BaseModel):
    report_text: str = Field(min_length=20)
    report_type: str = "discharge"
    audience: str = "clinician"
    max_bullet_points: int = Field(default=8, ge=3, le=20)


class ReportSummarizeResponse(BaseModel):
    summary: str
    key_findings: list[str]
    action_items: list[str]
    patient_friendly_summary: str | None = None
`,
    [`${base}/app/services/__init__.py`]: `from app.services.diagnosis_service import DiagnosisAssistService
from app.services.drug_interaction_service import DrugInteractionService
from app.services.risk_prediction_service import RiskPredictionService
from app.services.icd10_service import Icd10CodingService
from app.services.report_summarization_service import ReportSummarizationService

__all__ = [
    "DiagnosisAssistService",
    "DrugInteractionService",
    "RiskPredictionService",
    "Icd10CodingService",
    "ReportSummarizationService",
]
`,
    [`${base}/app/services/diagnosis_service.py`]: `from __future__ import annotations

from app.schemas.diagnosis import (
    DiagnosisAssistRequest,
    DiagnosisAssistResponse,
    DiagnosisCandidate,
)

SYMPTOM_RULES: dict[str, list[tuple[str, str, float, str]]] = {
    "fever": [("Influenza", "J11.1", 0.62, "Acute febrile illness"), ("Sepsis", "A41.9", 0.41, "Systemic infection workup")],
    "chest pain": [("Angina pectoris", "I20.9", 0.58, "Cardiac ischemia evaluation"), ("GERD", "K21.9", 0.35, "Non-cardiac chest pain")],
    "shortness of breath": [("Acute heart failure", "I50.9", 0.55, "Evaluate volume status"), ("COPD exacerbation", "J44.1", 0.48, "Respiratory distress")],
    "headache": [("Migraine", "G43.909", 0.57, "Primary headache disorder"), ("Hypertensive urgency", "I16.0", 0.33, "Check blood pressure")],
    "abdominal pain": [("Appendicitis", "K35.80", 0.44, "RLQ pain and guarding"), ("Gastroenteritis", "A09", 0.52, "Acute GI symptoms")],
}

RED_FLAG_RULES: dict[str, list[str]] = {
    "chest pain": ["Consider acute coronary syndrome until proven otherwise"],
    "shortness of breath": ["Assess for hypoxia and hemodynamic instability"],
    "headache": ["Evaluate for thunderclap headache or neurologic deficits"],
}


class DiagnosisAssistService:
    def assist(self, request: DiagnosisAssistRequest) -> DiagnosisAssistResponse:
        normalized = [s.strip().lower() for s in request.symptoms if s.strip()]
        candidates: dict[str, DiagnosisCandidate] = {}
        red_flags: list[str] = []
        follow_up: list[str] = []

        for symptom in normalized:
            for condition, icd, confidence, rationale in SYMPTOM_RULES.get(symptom, []):
                boost = 0.05 if request.patient.age_years >= 65 else 0.0
                score = min(0.98, confidence + boost)
                existing = candidates.get(condition)
                if not existing or existing.confidence < score:
                    candidates[condition] = DiagnosisCandidate(
                        condition=condition,
                        icd10_hint=icd,
                        confidence=score,
                        rationale=rationale,
                        recommended_tests=self._recommended_tests(condition),
                    )
            red_flags.extend(RED_FLAG_RULES.get(symptom, []))

        if request.vitals.get("temperature_c", 37) >= 39:
            follow_up.append("Confirm infection source and hemodynamic status")
        if request.vitals.get("spo2", 100) < 92:
            red_flags.append("Hypoxemia detected — escalate respiratory assessment")

        ranked = sorted(candidates.values(), key=lambda c: c.confidence, reverse=True)[:5]
        if not ranked:
            ranked = [
                DiagnosisCandidate(
                    condition="Undifferentiated acute illness",
                    icd10_hint="R69",
                    confidence=0.31,
                    rationale="Insufficient pattern match — broaden workup",
                    recommended_tests=["CBC", "Basic metabolic panel"],
                )
            ]

        return DiagnosisAssistResponse(
            candidates=ranked,
            red_flags=list(dict.fromkeys(red_flags)),
            follow_up_questions=follow_up or ["Any recent travel or sick contacts?"],
        )

    @staticmethod
    def _recommended_tests(condition: str) -> list[str]:
        mapping = {
            "Angina pectoris": ["ECG", "Troponin"],
            "Sepsis": ["Blood cultures", "Lactate"],
            "Appendicitis": ["CBC", "Abdominal CT"],
            "Migraine": ["Neurologic exam"],
        }
        return mapping.get(condition, ["Targeted labs based on presentation"])
`,
    [`${base}/app/services/drug_interaction_service.py`]: `from __future__ import annotations

from app.core.config import settings
from app.schemas.drug_interaction import (
    DrugInteractionRequest,
    DrugInteractionResponse,
    InteractionFinding,
)

KNOWN_INTERACTIONS: dict[frozenset[str], tuple[str, str, str, float]] = {
    frozenset({"warfarin", "aspirin"}): (
        "major",
        "Additive anticoagulant effect increases bleeding risk",
        "Avoid combination unless strictly indicated; monitor INR and signs of bleeding",
        0.91,
    ),
    frozenset({"simvastatin", "clarithromycin"}): (
        "major",
        "CYP3A4 inhibition raises statin levels",
        "Suspend simvastatin during clarithromycin course or select alternative antibiotic",
        0.88,
    ),
    frozenset({"metformin", "contrast dye"}): (
        "moderate",
        "Risk of lactic acidosis with acute kidney injury",
        "Hold metformin per protocol after iodinated contrast",
        0.76,
    ),
    frozenset({"lisinopril", "potassium"}): (
        "moderate",
        "Hyperkalemia risk with ACE inhibitor",
        "Monitor serum potassium within 1 week",
        0.73,
    ),
}


class DrugInteractionService:
    def evaluate(self, request: DrugInteractionRequest) -> DrugInteractionResponse:
        meds = {
            m.strip().lower()
            for m in [
                *request.patient.current_medications,
                *request.additional_medications,
                request.proposed_medication,
            ]
            if m.strip()
        }

        findings: list[InteractionFinding] = []
        for pair, (severity, mechanism, recommendation, confidence) in KNOWN_INTERACTIONS.items():
            if pair.issubset(meds) and confidence >= settings.interaction_confidence_threshold:
                drugs = sorted(pair)
                findings.append(
                    InteractionFinding(
                        drug_a=drugs[0],
                        drug_b=drugs[1],
                        severity=severity,
                        mechanism=mechanism,
                        recommendation=recommendation,
                        confidence=confidence,
                    )
                )

        allergy_hits = [
            allergen
            for allergen in request.patient.allergies
            if allergen.lower() in request.proposed_medication.lower()
        ]
        if allergy_hits:
            findings.append(
                InteractionFinding(
                    drug_a=request.proposed_medication,
                    drug_b=allergy_hits[0],
                    severity="contraindicated",
                    mechanism="Documented allergy overlap",
                    recommendation="Do not prescribe; select alternative agent",
                    confidence=0.99,
                )
            )

        safe = not any(f.severity in {"major", "contraindicated"} for f in findings)
        summary = (
            "No major interactions detected at configured threshold"
            if safe
            else "Potential interactions require pharmacist or physician review"
        )
        return DrugInteractionResponse(findings=findings, safe_to_prescribe=safe, summary=summary)
`,
    [`${base}/app/services/risk_prediction_service.py`]: `from __future__ import annotations

import math

from app.schemas.risk import RiskFactorScore, RiskPredictionRequest, RiskPredictionResponse

MODEL_BASELINES: dict[str, float] = {
    "readmission": 0.18,
    "sepsis": 0.07,
    "fall": 0.12,
    "cardiovascular": 0.15,
}


class RiskPredictionService:
    def predict(self, request: RiskPredictionRequest) -> RiskPredictionResponse:
        baseline = MODEL_BASELINES.get(request.risk_model, 0.1)
        factors: list[RiskFactorScore] = []

        age_factor = min(0.35, request.patient.age_years / 200)
        factors.append(RiskFactorScore(factor="age", weight=0.25, contribution=age_factor))

        comorbidity_factor = min(0.4, len(request.patient.chronic_conditions) * 0.06)
        factors.append(
            RiskFactorScore(factor="comorbidity_count", weight=0.3, contribution=comorbidity_factor)
        )

        feature_sum = sum(request.features.values()) * 0.01
        factors.append(RiskFactorScore(factor="custom_features", weight=0.2, contribution=feature_sum))

        raw = baseline + sum(f.contribution * f.weight for f in factors)
        score = max(0.01, min(0.99, 1 - math.exp(-raw * 3)))

        band = "low" if score < 0.25 else "moderate" if score < 0.55 else "high"
        interventions = self._interventions(request.risk_model, band)

        return RiskPredictionResponse(
            risk_model=request.risk_model,
            score=round(score, 4),
            risk_band=band,
            factors=factors,
            interventions=interventions,
        )

    @staticmethod
    def _interventions(model: str, band: str) -> list[str]:
        if band == "low":
            return ["Continue standard care pathway"]
        if model == "readmission":
            return ["Schedule early follow-up", "Medication reconciliation", "Patient education"]
        if model == "sepsis":
            return ["Escalate monitoring", "Review infection source", "Consider sepsis bundle"]
        if model == "fall":
            return ["Mobility assessment", "Home safety review", "Medication sedative review"]
        return ["Intensify preventive cardiology follow-up"]
`,
    [`${base}/app/services/icd10_service.py`]: `from __future__ import annotations

import re

from app.schemas.icd10 import Icd10CodeSuggestion, Icd10CodingRequest, Icd10CodingResponse

KEYWORD_MAP: list[tuple[re.Pattern[str], str, str, float]] = [
    (re.compile(r"\\btype 2 diabetes\\b", re.I), "E11.9", "Type 2 diabetes mellitus without complications", 0.86),
    (re.compile(r"\\bhypertension\\b", re.I), "I10", "Essential (primary) hypertension", 0.82),
    (re.compile(r"\\bcopd\\b", re.I), "J44.9", "Chronic obstructive pulmonary disease, unspecified", 0.8),
    (re.compile(r"\\batrial fibrillation\\b", re.I), "I48.91", "Unspecified atrial fibrillation", 0.84),
    (re.compile(r"\\back pain\\b", re.I), "M54.9", "Dorsalgia, unspecified", 0.7),
    (re.compile(r"\\buti\\b|urinary tract infection", re.I), "N39.0", "Urinary tract infection, site not specified", 0.78),
]


class Icd10CodingService:
    def code(self, request: Icd10CodingRequest) -> Icd10CodingResponse:
        suggestions: list[Icd10CodeSuggestion] = []
        for pattern, code, description, confidence in KEYWORD_MAP:
            if pattern.search(request.clinical_text):
                suggestions.append(
                    Icd10CodeSuggestion(
                        code=code,
                        description=description,
                        confidence=confidence,
                        is_primary=False,
                    )
                )

        suggestions.sort(key=lambda s: s.confidence, reverse=True)
        primary = None
        secondary: list[Icd10CodeSuggestion] = []
        if suggestions:
            primary = suggestions[0].model_copy(update={"is_primary": True})
            secondary = suggestions[1:5]

        gaps: list[str] = []
        if not re.search(r"\\b(onset|duration|severity)\\b", request.clinical_text, re.I):
            gaps.append("Document symptom onset and severity for higher coding specificity")
        if request.encounter_type == "inpatient" and not re.search(r"\\b(admit|admission)\\b", request.clinical_text, re.I):
            gaps.append("Inpatient note should include admission reason")

        return Icd10CodingResponse(primary=primary, secondary=secondary, documentation_gaps=gaps)
`,
    [`${base}/app/services/report_summarization_service.py`]: `from __future__ import annotations

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
`,
    [`${base}/app/routers/__init__.py`]: ``,
    [`${base}/app/routers/health.py`]: `from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "diagnosis-ai"}


@router.get("/health/ready")
async def ready() -> dict[str, str]:
    return {"status": "ready"}
`,
    [`${base}/app/routers/diagnosis.py`]: `from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.diagnosis import DiagnosisAssistRequest, DiagnosisAssistResponse
from app.services.diagnosis_service import DiagnosisAssistService

router = APIRouter()
service = DiagnosisAssistService()


@router.post("/assist", response_model=ApiResponse[DiagnosisAssistResponse])
async def assist_diagnosis(
    body: DiagnosisAssistRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[DiagnosisAssistResponse]:
    result = service.assist(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
`,
    [`${base}/app/routers/drug_interaction.py`]: `from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.drug_interaction import DrugInteractionRequest, DrugInteractionResponse
from app.services.drug_interaction_service import DrugInteractionService

router = APIRouter()
service = DrugInteractionService()


@router.post("/check", response_model=ApiResponse[DrugInteractionResponse])
async def check_interactions(
    body: DrugInteractionRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[DrugInteractionResponse]:
    result = service.evaluate(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
`,
    [`${base}/app/routers/risk.py`]: `from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.risk import RiskPredictionRequest, RiskPredictionResponse
from app.services.risk_prediction_service import RiskPredictionService

router = APIRouter()
service = RiskPredictionService()


@router.post("/predict", response_model=ApiResponse[RiskPredictionResponse])
async def predict_risk(
    body: RiskPredictionRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[RiskPredictionResponse]:
    result = service.predict(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
`,
    [`${base}/app/routers/icd10.py`]: `from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.icd10 import Icd10CodingRequest, Icd10CodingResponse
from app.services.icd10_service import Icd10CodingService

router = APIRouter()
service = Icd10CodingService()


@router.post("/code", response_model=ApiResponse[Icd10CodingResponse])
async def suggest_icd10_codes(
    body: Icd10CodingRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[Icd10CodingResponse]:
    result = service.code(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
`,
    [`${base}/app/routers/report.py`]: `from fastapi import APIRouter, Header

from app.schemas.common import ApiResponse
from app.schemas.report import ReportSummarizeRequest, ReportSummarizeResponse
from app.services.report_summarization_service import ReportSummarizationService

router = APIRouter()
service = ReportSummarizationService()


@router.post("/summarize", response_model=ApiResponse[ReportSummarizeResponse])
async def summarize_report(
    body: ReportSummarizeRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
) -> ApiResponse[ReportSummarizeResponse]:
    result = service.summarize(body)
    return ApiResponse(data=result, correlation_id=x_correlation_id)
`,
    [`${base}/tests/test_diagnosis_service.py`]: `from app.schemas.common import PatientContext
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
`,
    [`${base}/tests/test_drug_interaction_service.py`]: `from app.schemas.common import PatientContext
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
`,
  };

  for (const [rel, content] of Object.entries(files)) {
    await writeGenerated(repoRoot, rel, content.endsWith('\n') ? content : content + '\n', stats);
  }
}
