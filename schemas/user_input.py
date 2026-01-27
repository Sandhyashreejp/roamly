from pydantic import BaseModel, Field
from typing import List

class UserInput(BaseModel):
    """
    This schema defines what information we need from the user 
    before Roamly can start planning.
    """
    city: str = Field(..., description="The city the user wants to visit.")
    interests: List[str] = Field(..., description="A list of activities or themes the user enjoys.")
    duration_days: int = Field(..., gt=0, description="How many days the trip will last. Must be greater than 0.")
    budget_level: str = Field(..., description="The spending level (e.g., Budget, Mid-range, Luxury).")