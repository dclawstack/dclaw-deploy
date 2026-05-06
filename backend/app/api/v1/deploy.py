import random
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter()


@router.post("/pipelines")
async def create_pipeline(payload: dict):
    pipeline_type = payload.get("pipeline_type", "Build")
    return {
        "id": str(uuid.uuid4()),
        "repo_url": payload.get("repo_url", ""),
        "pipeline_type": pipeline_type,
        "stages": ["Build", "Test", "Deploy"],
        "duration_estimate": random.randint(5, 30),
        "risk_flags": ["No tests detected"],
        "status": "draft",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/pipelines/{id}/stages")
async def get_pipeline_stages(id: str):
    return ["Build", "Test", "Deploy"]
