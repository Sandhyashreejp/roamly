from crewai import Agent
from crewai_tools import SerperDevTool, ScrapeWebsiteTool # Add this line

def get_gastronomy_scout():
    return Agent(
        role="Expert Culinary Scout & Food Critic",
        goal="Find authentic dining experiences that match the user's budget and interests.",
        backstory=(
            "You are a food explorer who finds the best local eateries, from street food "
            "to hidden bistros. You verify price ranges and menus to ensure they fit "
            "the user's budget and dietary preferences. You focus on spots with local character."
        ),
        tools=[SerperDevTool(), ScrapeWebsiteTool()], # Now this will work!
        verbose=True,
        cache=True
    )