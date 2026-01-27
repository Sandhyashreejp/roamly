from crewai import Agent
from tools.scraper_tool import get_scraper_tool

def get_gastronomy_scout():
    scraper_tool = get_scraper_tool()
    
    return Agent(
        role="Gastronomy Scout",
        goal="Extract restaurant menus and pricing from websites to find the best {budget_level} options in {city}.",
        backstory="""You are a data-driven food expert. You don't just trust reviews; 
        you go straight to the source by reading restaurant menus to ensure 
        they meet dietary needs and budget limits.""",
        tools=[scraper_tool],
        verbose=True,
        allow_delegation=False
    )