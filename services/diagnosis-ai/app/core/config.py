from pydantic_settings import BaseSettings, SettingsConfigDict


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
