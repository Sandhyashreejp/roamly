from crewai import Crew, Process, Task
from agents.urban_navigator import get_urban_navigator
from agents.culture_curator import get_culture_curator
from agents.gastronomy_scout import get_gastronomy_scout
from agents.budget_balancer import get_budget_balancer
from agents.time_orchestrator import get_time_orchestrator # Final Agent

def run_roamly(user_data):
    # Initialize all five specialized agents from the exposé
    navigator = get_urban_navigator()
    curator = get_culture_curator()
    scout = get_gastronomy_scout()
    balancer = get_budget_balancer()
    orchestrator = get_time_orchestrator()

    # Define the 5-step task sequence
    task_nav = Task(
        description=f"Identify 3 key neighborhoods in {user_data.city} based on: {user_data.interests}.",
        agent=navigator,
        expected_output="3 neighborhoods with brief logistical context."
    )

    task_culture = Task(
        description=f"Find 2-3 authentic cultural gems in {user_data.city} within these neighborhoods.",
        agent=curator,
        expected_output="Cultural spots with descriptions and 'vibe' details."
    )

    task_food = Task(
        description=f"Find 3 dining options in {user_data.city} matching a {user_data.budget_level} budget.",
        agent=scout,
        expected_output="Dining recommendations including meal types and price levels."
    )

    task_budget = Task(
        description=f"Audit the costs of the selected spots to ensure they fit a {user_data.budget_level} profile.",
        agent=balancer,
        expected_output="A brief cost-validation report."
    )

    # The Final Task: The Time-Aware Itinerary
    task_time = Task(
        description=f"Organize all selected spots into a {user_data.duration_days}-day chronological itinerary.",
        agent=orchestrator,
        expected_output="A day-by-day schedule with morning, afternoon, and evening slots."
    )

    # Assemble the full Master's Research Crew
    crew = Crew(
        agents=[navigator, curator, scout, balancer, orchestrator],
        tasks=[task_nav, task_culture, task_food, task_budget, task_time],
        process=Process.sequential
    )

    return crew.kickoff()