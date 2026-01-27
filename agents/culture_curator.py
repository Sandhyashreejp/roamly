from crewai import Agent
from tools.search_tool import get_search_tool

def get_culture_curator():
    search_tool = get_search_tool()
    
    return Agent(
        role="Culture Curator",
        goal="Discover cultural events and hidden secrets in {city}.",
        backstory="""You search local blogs and event portals to find 
        what is happening in the city right now.""",
        tools=[search_tool],
        verbose=True,
        allow_delegation=False
    )