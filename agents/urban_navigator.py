from crewai import Agent

def get_urban_navigator():
    return Agent(
        role="Urban Navigator",
        goal="Identify suitable neighborhoods and retrieve real-time transportation info for {city}.",
        backstory="""You are an expert in urban logistics and city layouts. 
        You excel at finding the most vibrant neighborhoods and understanding 
        how to move between them efficiently using local transit.""",
        verbose=True,
        allow_delegation=False
    )