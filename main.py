from schemas.user_input import UserInput

def test_schema():
    print("--- Testing Roamly UserInput Schema ---")
    
    # 1. Test with valid data
    try:
        valid_data = UserInput(
            city="Paris",
            interests=["Art", "Bakeries"],
            duration_days=3,
            budget_level="Mid-range"
        )
        print(f"✅ Success! Valid Input: {valid_data}")
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")

    # 2. Test with invalid data (Negative days)
    print("\n--- Testing Validation (Intentional Error) ---")
    try:
        invalid_data = UserInput(
            city="Berlin",
            interests=["History"],
            duration_days=-1,  # This should fail!
            budget_level="Budget"
        )
    except Exception as e:
        print(f"✅ Validation caught the error as expected:\n{e}")

if __name__ == "__main__":
    test_schema()