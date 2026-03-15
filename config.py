"""
Configuration file for Roamly - centralized LLM setup

To change the model, set the OPENAI_MODEL_NAME environment variable:
    export OPENAI_MODEL_NAME="gpt-5-mini"

Available options (March 2026):
    - "gpt-5-mini" (FASTEST ⚡, cheapest, good quality) - RECOMMENDED
    - "gpt-5.3-codex" (fast, excellent quality) - best for agentic systems
    - "gpt-5.4" (medium speed, best quality, expensive)
    - "gpt-4-turbo" (medium speed, good quality) - legacy
    - "gpt-3.5-turbo" (fast, basic quality) - legacy

Default: gpt-4-turbo (via CrewAI)
"""

import os

# Default to gpt-4-turbo, but allow override via environment variable
MODEL_NAME = os.getenv("OPENAI_MODEL_NAME", "gpt-4-turbo")
