from crewai import Agent
from tools.search_tool import get_search_tool

def get_budget_balancer():
    search_tool = get_search_tool()
    
    return Agent(
        role="Budget Balancer",
        goal="Audit trip costs and ensure the total stays within the {budget_level} limit.",
        backstory="""You are a meticulous financial auditor for travel. 
        You take the suggestions from the Navigator and Scout, calculate the 
        total estimated cost, and if it's too high, you search for cheaper 
        but equally authentic alternatives.""",
        tools=[search_tool],
        verbose=True,
        allow_delegation=False
    )