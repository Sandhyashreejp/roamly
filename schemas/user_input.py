from pydantic import BaseModel, Field
from typing import List
from datetime import date

class UserInput(BaseModel):
    city: str = Field(..., description="The city the user wants to visit.")
    interests: List[str] = Field(..., description="A list of activities or themes the user enjoys.")
    duration_days: int = Field(..., gt=0, description="How many days the trip will last.")
    budget_level: str = Field(..., description="The spending level.")
    
    # FIX: Use '=' to assign the default_factory. 
    # This tells Pydantic: "If missing, call date.today"
    start_date: date = Field(default_factory=date.today)