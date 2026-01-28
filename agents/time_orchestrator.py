from crewai import Agent
from tools.search_tool import get_search_tool

def get_time_orchestrator():
    search_tool = get_search_tool()
    
    return Agent(
        role="Time Orchestrator",
        goal="Synthesize all data into a feasible, weather-aware, and chronological itinerary.",
        backstory="""You are a logistical genius. You take the suggestions from 
        the Navigator, Curator, and Scout, check the weather and venue hours, 
        and arrange everything into a perfect schedule that maximizes 
        the user's time and energy.""",
        tools=[search_tool],
        verbose=True,
        allow_delegation=False
    )