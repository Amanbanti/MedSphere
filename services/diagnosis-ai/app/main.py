from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging import configure_logging
from app.routers import diagnosis, drug_interaction, icd10, report, risk, health, cds, image_classification


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
app.include_router(cds.router, prefix="/api/v1/cds", tags=["cds"])
app.include_router(image_classification.router, prefix="/api/v1/imaging", tags=["imaging"])
