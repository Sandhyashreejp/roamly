from crewai import Agent
from crewai_tools import SerperDevTool, ScrapeWebsiteTool

def get_time_orchestrator():
    return Agent(
        role="Master Travel Chronologist & Scheduler",
        goal="Synthesize all agent findings into a logical, time-optimized daily itinerary.",
        backstory=(
            "You are a world-class travel concierge. You specialize in 'logical flow.' "
            "You ensure that activities in the same neighborhood are grouped together "
            "to minimize travel time. You check weather forecasts to place outdoor "
            "activities on sunny days and ensure opening hours are strictly respected."
        ),
        tools=[SerperDevTool(), ScrapeWebsiteTool()],
        verbose=True,
        cache=True
    )