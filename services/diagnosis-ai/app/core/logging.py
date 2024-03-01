import logging
import sys


def configure_logging(service_name: str, level: str = "INFO") -> None:
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format=f"%(asctime)s %(levelname)s [{service_name}] %(name)s - %(message)s",
        stream=sys.stdout,
    )
