from crewai import Agent
from tools.search_tool import get_search_tool

def get_urban_navigator():
    search_tool = get_search_tool()
    
    return Agent(
        role="Urban Navigator",
        goal="Identify suitable neighborhoods and retrieve real-time transportation info for {city}.",
        backstory="""You use real-time search tools to find current transit 
        statuses and neighborhood trends.""",
        tools=[search_tool], # Giving the agent the 'web browser'
        verbose=True,
        allow_delegation=False
    )