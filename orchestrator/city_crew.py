from crewai import Crew, Process, Task
from agents.urban_navigator import get_urban_navigator
from agents.culture_curator import get_culture_curator
from agents.gastronomy_scout import get_gastronomy_scout # New
from agents.budget_balancer import get_budget_balancer   # New

def run_roamly(user_data):
    # Initialize all four agents
    navigator = get_urban_navigator()
    curator = get_culture_curator()
    scout = get_gastronomy_scout()
    balancer = get_budget_balancer()

    # Task 1: Neighborhoods
    task_nav = Task(
        description=f"Research neighborhoods in {user_data.city} for interests: {user_data.interests}.",
        agent=navigator,
        expected_output="3 recommended neighborhoods."
    )

    # Task 2: Culture
    task_culture = Task(
        description=f"Find 2 hidden cultural gems in {user_data.city}.",
        agent=curator,
        expected_output="2 authentic cultural spots."
    )

    # Task 3: Food (New)
    task_food = Task(
        description=f"Find 3 dining options in {user_data.city} that fit a {user_data.budget_level} budget.",
        agent=scout,
        expected_output="3 restaurant recommendations with brief descriptions."
    )

    # Task 4: Budget Check (New)
    task_budget = Task(
        description=f"Review the total estimated cost for the suggestions in {user_data.city} and ensure it fits {user_data.budget_level}.",
        agent=balancer,
        expected_output="A brief budget breakdown and confirmation of affordability."
    )

    # Assemble the expanded crew
    crew = Crew(
        agents=[navigator, curator, scout, balancer],
        tasks=[task_nav, task_culture, task_food, task_budget],
        process=Process.sequential
    )

    return crew.kickoff()