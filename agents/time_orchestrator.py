from crewai import Agent

def get_time_orchestrator():
    return Agent(
        role="Time Orchestrator",
        goal="Build a feasible, time-aware itinerary using weather forecasts and venue hours.",
        backstory="""You are a master scheduler and logistics expert. 
        You specialize in sequence and timing, ensuring that travel routes 
        make sense geographically and that outdoor activities are planned 
        for the best weather windows.""",
        verbose=True,
        allow_delegation=False
    )