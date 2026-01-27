from schemas.user_input import UserInput
from orchestrator.city_crew import run_roamly

def main():
    # 1. Capture Validated Input
    user_request = UserInput(
        city="Berlin",
        interests=["Techno culture", "History"],
        duration_days=2,
        budget_level="Student"
    )

    # 2. Run the Roamly Pipeline
    print(f"🚀 Roamly is planning your trip to {user_request.city}...\n")
    result = run_roamly(user_request)
    
    print("\n--- FINAL ITINERARY ---")
    print(result)

if __name__ == "__main__":
    main()