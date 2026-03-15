from crewai import Agent
from crewai_tools import SerperDevTool, ScrapeWebsiteTool

def get_urban_navigator():
    return Agent(
        role="Senior Urban Logistics Architect",
        goal="Identify the most efficient and culturally relevant neighborhoods in {city} based on {interests}.",
        backstory=(
            "You are an expert in urban planning. Your job is to analyze the city's layout, "
            "transportation hubs, and neighborhood 'vibes' to provide a logistical foundation "
            "for a trip. You prioritize areas with high connectivity and safety."
        ),
        tools=[SerperDevTool(), ScrapeWebsiteTool()],
        verbose=False,
        allow_delegation=False,
        cache=True
    )
