from crewai import Crew, Process, Task
from agents.urban_navigator import get_urban_navigator
from agents.culture_curator import get_culture_curator

def run_roamly(user_data):
    # Initialize agents based on research roles
    navigator = get_urban_navigator()
    curator = get_culture_curator()

    # Define simple placeholder tasks
    task1 = Task(
        description=f"Research the best neighborhoods in {user_data.city} for someone interested in {user_data.interests}.",
        agent=navigator,
        expected_output="A list of 3 recommended neighborhoods with transit options."
    )

    task2 = Task(
        description=f"Find 2 hidden cultural gems in {user_data.city} that fit the budget level: {user_data.budget_level}.",
        agent=curator,
        expected_output="A description of 2 authentic cultural spots."
    )

    # Assemble the crew
    crew = Crew(
        agents=[navigator, curator],
        tasks=[task1, task2],
        process=Process.sequential # One after the other
    )

    return crew.kickoff()