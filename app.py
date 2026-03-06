import os
from datetime import date
# DISABLE CREWAI TELEMETRY SIGNALS
os.environ["OTEL_SDK_DISABLED"] = "true"
os.environ["PYDANTIC_SKIP_VALIDATOR_STRINGS"] = "true"

import streamlit as st
from schemas.user_input import UserInput
from orchestrator.city_crew import run_roamly

st.set_page_config(page_title="Roamly | Smart City Planner", layout="wide", page_icon="🏙️")

# Custom CSS for a more "Travel App" feel
st.markdown("""
    <style>
    .reportview-container { background: #f0f2f6; }
    .stCard { border-radius: 10px; border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background: white; }
    </style>
""", unsafe_allow_html=True)

st.title("Roamly")
st.caption("Your Personalized Urban Exploration")

with st.sidebar:
    st.header("📍 Plan Your Trip")
    city = st.text_input("Destination City", value="Heidelberg")
    interests = st.multiselect("What do you love?", ["Techno culture", "History", "Food", "Art", "Sustainability"], default=["History", "Techno culture"])
    days = st.slider("Duration (Days)", 1, 7, 2)
    budget = st.selectbox("Budget Level", ["Student", "Mid-range", "Luxury"])
    start_date = st.date_input("Start Date", value=date(2026, 2, 27))
    
    run_button = st.button("Generate Master Plan", type="primary")

if run_button:
    with st.spinner("🤖 Agents are researching transit, events, and menus..."):
        user_request = UserInput(
            city=city,
            interests=interests,
            duration_days=days,
            budget_level=budget,
            start_date=start_date
        )
        
        result = run_roamly(user_request)
        # kickoff() returns a CrewOutput; result.pydantic contains the FinalItinerary object
        itinerary = result.pydantic

        st.success(f"Plan for {itinerary.city} is Ready!")
        
        # --- TOP LEVEL METRICS ---
        col1, col2, col3 = st.columns(3)
        col1.metric("Total Estimate", f"{itinerary.total_estimated_cost} {itinerary.currency}")
        col2.metric("Duration", f"{len(itinerary.daily_plans)} Days")
        col3.metric("Location", itinerary.city)

        # --- DAILY TABS ---
        tabs = st.tabs([f"Day {day.day_number}" for day in itinerary.daily_plans])
        
        for i, day in enumerate(itinerary.daily_plans):
            with tabs[i]:
                st.subheader(f"📅 {day.date}")
                st.info(f"🌤️ **Weather Forecast:** {day.daily_weather_forecast}")
                
                for act in day.activities:
                    with st.expander(f"🕒 {act.time_slot}: {act.activity_name}"):
                        st.markdown(f"**📍 Location:** {act.location} ({act.neighborhood})")
                        st.write(act.description)
                        st.write(f"**💰 Est. Cost:** {act.estimated_cost} {itinerary.currency}")
                        st.markdown(f"**🚋 Transit:** {act.transport_to_next}")
                        st.warning(f"☔ **Weather Backup:** {act.weather_contingency}")

        # --- FINAL ADVICE ---
        st.divider()
        st.markdown("### 💡 Pro Travel Advice")
        st.write(itinerary.final_travel_advice)
