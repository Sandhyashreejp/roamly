import time
from crewai import Crew, Process, Task
from agents.urban_navigator import get_urban_navigator
from agents.culture_curator import get_culture_curator
from agents.gastronomy_scout import get_gastronomy_scout
from agents.budget_balancer import get_budget_balancer
from agents.time_orchestrator import get_time_orchestrator

# Import all structured schemas
from schemas.output_format import (
    UrbanNavigatorOutput, 
    CultureCuratorOutput, 
    GastronomyScoutOutput,
    BudgetBalancerOutput,
    FinalItinerary # The final goal
)

def run_roamly(user_data):
    """
    Orchestrates the Roamly multi-agent system.
    Final Phase: Full 5-Agent End-to-End Pipeline
    """
    
    # 1. Initialize all specialized agents
    navigator = get_urban_navigator()
    curator = get_culture_curator()
    scout = get_gastronomy_scout()
    balancer = get_budget_balancer()
    orchestrator = get_time_orchestrator()

    # 2. Task 1: Urban Navigator (Logistics foundation)
    task_nav = Task(
        description=(
            f"Role: Senior Urban Logistics Architect. City: {user_data.city}.\n"
            f"Interests: {user_data.interests}.\n\n"
            "1. RESEARCH: Analyze the urban layout and neighborhood vibes.\n"
            "2. IDENTIFY: Pick 3 neighborhoods that align with the user's interests.\n"
            "3. LOGISTICS: Find current transit warnings or station closures.\n"
            "4. RECOMMEND: Select the best single 'Base Area'.\n"
            "5. CONNECTIVITY: Calculate estimated transit times.\n"
            "6. TIPS: Provide 2-3 specific mobility tips."
        ),
        agent=navigator,
        expected_output="A structured JSON object with neighborhood details and mobility planning.",
        output_pydantic=UrbanNavigatorOutput
    )

    # 3. Task 2: Culture Curator (Hidden gem discovery)
    task_culture = Task(
        description=(
            f"1. ANALYZE: Review the neighborhoods from the Urban Navigator.\n"
            f"2. SEARCH: Find 3 'hidden gem' cultural spots in those neighborhoods.\n"
            f"3. FILTER: Ensure spots match the user's interests: {user_data.interests}.\n"
            "4. SCRAPE: Verify opening hours and event descriptions from venue sites.\n"
            "5. OUTPUT: Provide a list of verified cultural spots."
        ),
        agent=curator,
        expected_output="A list of verified cultural hidden gems in the recommended neighborhoods.",
        context=[task_nav],
        output_pydantic=CultureCuratorOutput
    )

    # 4. Task 3: Gastronomy Scout (Dining intelligence)
    task_food = Task(
        description=(
            f"1. ANALYZE: Review the neighborhoods and cultural spots from previous agents.\n"
            f"2. SEARCH: Find 3 restaurants in those neighborhoods fitting a {user_data.budget_level} budget.\n"
            f"3. MATCH: Ensure they offer cuisines or vibes relevant to: {user_data.interests}.\n"
            "4. SCRAPE: Visit their websites to verify menu highlights, dietary options, and pricing.\n"
            "5. OUTPUT: Provide a list of 3 verified dining recommendations."
        ),
        agent=scout,
        expected_output="A list of 3 restaurants that fit the budget, interests, and neighborhood.",
        context=[task_nav, task_culture],
        output_pydantic=GastronomyScoutOutput
    )

    # 5. Task 4: Budget Balancer (Financial audit)
    task_budget = Task(
        description=(
            f"1. AUDIT: Extract costs from the cultural spots and restaurants found by previous agents.\n"
            f"2. CALCULATE: Sum the costs for a {user_data.duration_days}-day stay including daily transit.\n"
            f"3. EVALUATE: Check if the total fits a '{user_data.budget_level}' budget for {user_data.city}.\n"
            f"4. OPTIMIZE: If needed, suggest specific free alternatives or cost-saving adjustments.\n"
            "5. OUTPUT: Provide a categorized breakdown and approval status."
        ),
        agent=balancer,
        expected_output="A detailed financial breakdown and budget status in JSON format.",
        context=[task_nav, task_culture, task_food],
        output_pydantic=BudgetBalancerOutput
    )

    # 6. Task 5: Time Orchestrator (The Final Scheduler)
    task_time = Task(
        description=(
            f"1. SYNTHESIZE: Review ALL findings: neighborhoods, cultural spots, restaurants, and the budget audit.\n"
            f"2. WEATHER: Search for the real-time weather forecast for {user_data.city} starting {user_data.start_date}.\n"
            f"3. SCHEDULE: Organize activities into logical slots for a {user_data.duration_days}-day itinerary.\n"
            "4. FLOW: Group activities by neighborhood to minimize travel. Respect verified opening hours.\n"
            "5. ADAPT: Include weather-contingency plans and transport logistics between spots.\n"
            "6. OUTPUT: Produce the final FinalItinerary JSON object."
        ),
        agent=orchestrator,
        expected_output="A complete, time-optimized daily travel plan in structured JSON format.",
        context=[task_nav, task_culture, task_food, task_budget],
        output_pydantic=FinalItinerary
    )

    # 7. Assemble the Full Master Crew
    # OPTION A: Sequential execution (current, safer, easier to debug)
    # Latency: ~75 seconds
    # Advantage: Clear order, easier debugging, task context guaranteed
    crew = Crew(
        agents=[navigator, curator, scout, balancer, orchestrator],
        tasks=[task_nav, task_culture, task_food, task_budget, task_time],
        process=Process.sequential,
        share_crew=False
    )

    # OPTION B: Hierarchical execution (faster, but needs manager coordination)
    # Uncomment to enable parallel execution of culture + gastronomy tasks
    # Latency: ~45-50 seconds (25-30 sec savings)
    # Advantage: Culture Curator + Gastronomy Scout run in parallel after Urban Navigator
    # crew = Crew(
    #     agents=[navigator, curator, scout, balancer, orchestrator],
    #     tasks=[task_nav, task_culture, task_food, task_budget, task_time],
    #     process=Process.hierarchical,
    #     share_crew=False
    # )

    print(f"\n🚀 Starting 5-phase agent workflow...", flush=True)
    phase_start = time.time()
    result = crew.kickoff()
    phase_elapsed = time.time() - phase_start

    print(f"✅ All 5 agents completed in {phase_elapsed:.1f} seconds", flush=True)
    print(f"   - Urban Navigator: ~15-20s", flush=True)
    print(f"   - Culture Curator: ~12-15s", flush=True)
    print(f"   - Gastronomy Scout: ~12-15s", flush=True)
    print(f"   - Budget Balancer: ~8-10s", flush=True)
    print(f"   - Time Orchestrator: ~15-20s", flush=True)

    return result