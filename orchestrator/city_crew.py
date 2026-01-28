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
        description=(
            f"1. Search for local cultural blogs or neighborhood news sites in {user_data.city}.\n"
            f"2. Identify 2 hidden gems (indie galleries, community markets, or small museums) "
            f"that are NOT major tourist attractions.\n"
            f"3. Use your scraper tool to verify the current opening hours and if any "
            f"special events are happening during the {user_data.duration_days}-day trip window."
        ),
        agent=curator,
        expected_output="A report on 2-3 authentic spots with confirmed opening times and event descriptions."
    )

    task_food = Task(
        description=(
            f"1. Search for 3 restaurants in {user_data.city} that fit a {user_data.budget_level} budget.\n"
            f"2. Use your scraper tool to visit their websites and verify they have options for these interests: {user_data.interests}.\n"
            "3. Confirm their price range is accurate."
        ),
        agent=scout,
        expected_output="3 verified dining recommendations with specific menu highlights and pricing."
    )

    task_budget = Task(
        description=(
            f"1. Review the neighborhoods, cultural spots, and restaurants suggested by the previous agents.\n"
            f"2. Search for the current entry fees for the cultural spots and average meal prices for the restaurants.\n"
            f"3. Calculate a total estimated daily budget for a {user_data.duration_days}-day trip.\n"
            f"4. If the total exceeds the {user_data.budget_level} level, suggest one specific cost-saving alternative."
        ),
        agent=balancer,
        expected_output="A detailed budget breakdown (Transport, Food, Activities) and a final 'Approved' or 'Adjusted' status."
    )

    # The Final Task: The Time-Aware Itinerary
    task_time = Task(
        description=(
            f"1. Take the approved spots and budget from the previous agents.\n"
            f"2. Search for the weather forecast in {user_data.city} for the next {user_data.duration_days} days.\n"
            f"3. Verify the opening hours for every suggested venue.\n"
            f"4. Organize the activities chronologically. Place outdoor activities "
            f"during good weather and group spots by neighborhood to minimize travel time.\n"
            f"5. Include estimated travel times between locations."
        ),
        agent=orchestrator,
        expected_output=f"A complete {user_data.duration_days}-day itinerary with time slots and weather-contingency notes."
    )

    # Assemble the full Master's Research Crew
    crew = Crew(
        agents=[navigator, curator, scout, balancer, orchestrator],
        tasks=[task_nav, task_culture, task_food, task_budget, task_time],
        process=Process.sequential
    )

    return crew.kickoff()