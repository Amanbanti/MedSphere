from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "diagnosis-ai"}


@router.get("/health/ready")
async def ready() -> dict[str, str]:
    return {"status": "ready"}
