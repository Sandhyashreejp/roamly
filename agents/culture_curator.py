from crewai import Agent
from crewai_tools import SerperDevTool, ScrapeWebsiteTool

def get_culture_curator():
    return Agent(
        role="Expert Local Culture & Events Scout",
        goal="Find authentic, non-touristy cultural experiences and events in the selected neighborhoods.",
        backstory=(
            "You are a local trendsetter who knows every indie gallery, underground club, "
            "and community market. You despise 'Top 10' tourist lists. You look for "
            "hidden gems and verify their current status using real-time scraping."
        ),
        tools=[SerperDevTool(), ScrapeWebsiteTool()],
        verbose=False,
        cache=True
    )
