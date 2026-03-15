"""
FastAPI backend for Roamly — wraps the existing CrewAI pipeline.
Run with: uvicorn api:app --reload --port 8000
"""

import os
import time
os.environ["OTEL_SDK_DISABLED"] = "true"
os.environ["PYDANTIC_SKIP_VALIDATOR_STRINGS"] = "true"

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.user_input import UserInput
from orchestrator.city_crew import run_roamly

app = FastAPI(title="Roamly API", version="1.0.0")

# Allow the React dev server (Vite default port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/plan")
def create_plan(user_input: UserInput):
    """
    Accepts trip parameters, runs the CrewAI pipeline,
    and returns the FinalItinerary JSON.
    """
    try:
        start_time = time.time()
        print(f"\n📍 Starting orchestration for {user_input.city}...", flush=True)

        raw_result = run_roamly(user_input)

        elapsed = time.time() - start_time
        print(f"✅ Orchestration completed in {elapsed:.1f} seconds", flush=True)

        # CrewAI returns CrewOutput — extract the pydantic model
        if hasattr(raw_result, "pydantic") and raw_result.pydantic is not None:
            itinerary = raw_result.pydantic
        else:
            itinerary = raw_result

        return itinerary.model_dump()

    except Exception as e:
        elapsed = time.time() - start_time
        print(f"❌ Error after {elapsed:.1f} seconds: {str(e)}", flush=True)
        raise HTTPException(status_code=500, detail=str(e))
