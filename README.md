# Roamly 🗺️

A multi-agent AI system that generates personalized travel itineraries using CrewAI and GPT-4.

![Python](https://img.shields.io/badge/python-3.11+-blue)
![Framework](https://img.shields.io/badge/CrewAI-v0.203.2-orange)
![LLM](https://img.shields.io/badge/GPT--4-OpenAI-green)

---

## How It Works

You provide a city, dates, budget and preferences. Five specialized AI agents then work sequentially to build your itinerary:

```
User Input
    ↓
Urban Navigator     → finds attractions & routes
    ↓
Culture Curator     → adds cultural context & events
    ↓
Gastronomy Scout    → recommends restaurants
    ↓
Budget Balancer     → optimizes for your budget
    ↓
Time Orchestrator   → builds the final day-by-day schedule
    ↓
Your Itinerary ✅
```

Each agent uses GPT-4 + real-time tools (Google Search, Google Maps, web scraping) to produce verified, up-to-date recommendations.

---

## Getting Started

**1. Clone & install**
```bash
git clone https://github.com/Sandhyashreejp/roamly.git
cd roamly
pip install -r requirements.txt
```

**2. Add your API keys to `.env`**
```
OPENAI_API_KEY=sk-...
SERPER_API_KEY=...
```

**3. Run the backend**
```bash
python api.py
# → http://localhost:8000
```

**4. Run the frontend (optional)**
```bash
cd frontend
npm install && npm run dev
# → http://localhost:5173
```

---

## Example Request

```bash
POST /api/plan
{
  "city": "Paris",
  "startDate": "2024-06-15",
  "endDate": "2024-06-22",
  "budget": 2000,
  "preferences": ["culture", "food"]
}
```

---

## Project Structure

```
roamly/
├── api.py               # FastAPI backend
├── config.py            # Configuration
├── agents/              # 5 CrewAI agents
├── orchestrator/        # Crew management
├── tools/               # API integrations
├── schemas/             # Pydantic models
├── frontend/            # React 18 + Vite
└── docs/                # Research reports & diagrams
```

---

## Performance

| Metric | Value |
|--------|-------|
| Response time | ~60-90 seconds |
| Cost per request | ~$0.22 USD |
| LLM | GPT-4 via OpenAI |
| Agents | 5 (sequential) |

---

## Research

This project is a research implementation exploring multi-agent LLM coordination, tool integration, and context propagation in agentic AI systems. See `docs/research/` for the full technical report.

---

*Built with CrewAI · OpenAI GPT-4 · FastAPI · React 18*
