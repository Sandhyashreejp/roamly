from crewai import Agent
from tools.search_tool import get_search_tool
from tools.scraper_tool import get_scraper_tool

def get_culture_curator():
    # Equipping both equipment: the 'radar' (search) and the 'magnifying glass' (scraper)
    search_tool = get_search_tool()
    scraper_tool = get_scraper_tool()
    
    return Agent(
        role="Culture Curator",
        goal="Identify non-touristic cultural events and hidden gems in {city} using live data.",
        backstory="""You are a specialist in urban anthropology and local culture. 
        You ignore 'Top 10' TripAdvisor lists and instead focus on local cultural blogs, 
        neighborhood event calendars, and indie venue sites to find truly 
        authentic experiences.""",
        tools=[search_tool, scraper_tool],
        verbose=True,
        allow_delegation=False
    )