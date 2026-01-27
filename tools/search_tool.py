from crewai_tools import SerperDevTool
import os
from dotenv import load_dotenv

load_dotenv()

def get_search_tool():
    """
    Returns the Google Search tool. 
    This allows agents to find real-time info about weather, 
    events, and transit.
    """
    return SerperDevTool()