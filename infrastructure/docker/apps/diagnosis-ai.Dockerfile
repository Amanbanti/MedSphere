# syntax=docker/dockerfile:1
# Production image for medsphere/diagnosis-ai (FastAPI)

FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
WORKDIR /app

FROM base AS deps
COPY services/diagnosis-ai/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

FROM base AS production
RUN groupadd -g 1001 medsphere && useradd -u 1001 -g medsphere -m medsphere \
  && apt-get update && apt-get install -y --no-install-recommends wget \
  && rm -rf /var/lib/apt/lists/*
COPY --from=deps /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin
COPY services/diagnosis-ai/app ./app
COPY services/diagnosis-ai/src ./src
USER medsphere
ENV PORT=4200
EXPOSE 4200
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4200/health || exit 1
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "4200"]
