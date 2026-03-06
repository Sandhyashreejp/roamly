from crewai import Agent
from crewai_tools import SerperDevTool, ScrapeWebsiteTool

def get_budget_balancer():
    """
    Returns an agent specialized in financial auditing and cost optimization.
    Equipped with search and scraping tools to verify real-world pricing.
    """
    return Agent(
        role="Senior Financial Travel Auditor",
        goal="Audit all trip suggestions to ensure they align with the user's '{budget_level}' budget.",
        backstory=(
            "You are a meticulous financial planner with an obsession for value. "
            "You evaluate the estimated costs of neighborhoods, attractions, and dining. "
            "Your strength lies in calculating total trip costs and finding high-quality "
            "but lower-cost alternatives if the current plan is too expensive. "
            "You ensure that no traveler faces 'price shock' upon arrival."
        ),
        tools=[SerperDevTool(), ScrapeWebsiteTool()],
        verbose=True,
        allow_delegation=False,
        cache=True
    )