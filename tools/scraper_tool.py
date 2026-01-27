from crewai_tools import ScrapeWebsiteTool

def get_scraper_tool():
    """
    Returns a tool that can read the content of a specific URL.
    Ideal for Gastronomy Scout to read restaurant menus and pricing.
    """
    return ScrapeWebsiteTool()