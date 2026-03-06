from pydantic import BaseModel, Field
from typing import List

# --- URBAN NAVIGATOR SCHEMAS ---
class TransitTime(BaseModel):
    origin: str = Field(..., description="Starting neighborhood")
    destination: str = Field(..., description="Ending neighborhood")
    minutes_range: str = Field(..., description="Estimated travel time range (e.g., 15-25)")

class Neighborhood(BaseModel):
    name: str
    tags: List[str]
    why_matches_user: List[str]
    cautions: List[str]

class MobilityPlan(BaseModel):
    primary_mode: str
    transit_tips: List[str]
    approx_travel_times: List[TransitTime]

class UrbanNavigatorOutput(BaseModel):
    city: str
    recommended_base_area: dict
    neighborhoods: List[Neighborhood]
    mobility_plan: MobilityPlan

# --- CULTURE CURATOR SCHEMAS ---
class CulturalSpot(BaseModel):
    name: str = Field(..., description="Name of the cultural venue or event")
    neighborhood: str = Field(..., description="Which neighborhood this is located in")
    type: str = Field(..., description="Category (e.g., Museum, Gallery, Underground Club)")
    description: str = Field(..., description="Detailed description")
    opening_hours: str = Field(..., description="Verified opening hours")
    why_it_is_special: str = Field(..., description="Reasoning for 'hidden gem' status")
    event_happening: str = Field(..., description="Specific event details or 'None'")

class CultureCuratorOutput(BaseModel):
    spots: List[CulturalSpot]

# --- GASTRONOMY SCOUT SCHEMAS ---
class Restaurant(BaseModel):
    name: str
    neighborhood: str
    cuisine_type: str
    dietary_options: List[str]
    price_range: str
    menu_highlight: str
    opening_hours: str
    why_it_matches_budget: str

class GastronomyScoutOutput(BaseModel):
    restaurants: List[Restaurant]

# --- BUDGET BALANCER SCHEMAS ---
class BudgetItem(BaseModel):
    category: str
    item_name: str
    estimated_cost: float
    currency: str

class BudgetBalancerOutput(BaseModel):
    total_trip_estimate: float
    currency: str
    individual_costs: List[BudgetItem]
    savings_tips: List[str]
    is_within_budget: bool
    adjustment_notes: str

# --- FINAL TIME ORCHESTRATOR SCHEMAS ---
class Activity(BaseModel):
    time_slot: str = Field(..., description="e.g., 09:00 - 11:00")
    activity_name: str
    location: str
    neighborhood: str
    description: str
    estimated_cost: float
    transport_to_next: str = Field(..., description="Logistics for the next move (e.g., 10 min walk, Tram 5)")
    weather_contingency: str = Field(..., description="Alternative plan for bad weather")

class DayPlan(BaseModel):
    day_number: int
    date: str
    daily_weather_forecast: str
    activities: List[Activity]

class FinalItinerary(BaseModel):
    city: str
    total_estimated_cost: float
    currency: str
    daily_plans: List[DayPlan]
    final_travel_advice: str = Field(..., description="Closing tips on local etiquette or safety")