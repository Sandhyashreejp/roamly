# ROAMLY Project Structure

## 📁 Directory Organization

### Core Application Files (Root)
- `api.py` - FastAPI backend server
- `config.py` - Configuration management
- `main.py` - Application entry point
- `requirements.txt` - Python dependencies
- `.env` - Environment variables
- `README.md` - Project documentation

### Source Code Directories
```
agents/                    # CrewAI Agent implementations
├── urban_navigator.py     # Route planning & attractions
├── culture_curator.py     # Cultural insights & events
├── gastronomy_scout.py    # Restaurant discovery
├── budget_balancer.py     # Cost optimization
└── time_orchestrator.py   # Schedule synthesis

orchestrator/              # CrewAI Crew management
├── city_crew.py          # Main orchestration logic
└── __init__.py

tools/                      # External tool integrations
├── serper_api.py         # Google Search API
├── google_maps.py        # Google Maps integration
└── web_scraper.py        # Web scraping utilities

schemas/                    # Pydantic data models
├── itinerary.py          # Itinerary schema
├── attraction.py         # Attraction schema
├── restaurant.py         # Restaurant schema
└── __init__.py

frontend/                   # React 18 + Vite frontend
├── src/
├── public/
├── package.json
├── vite.config.js
└── node_modules/
```

### Documentation (Non-essential)
```
docs/
├── research/              # Technical reports & research
│   ├── ROAMLY_TECHNICAL_REPORT.md
│   ├── ROAMLY_TECHNICAL_REPORT_v2.docx
│   ├── generate_full_report.py
│   └── generate_technical_report.py
│
└── diagrams/              # Architecture diagrams
    ├── SYSTEM_ARCHITECTURE_DIAGRAM.mermaid
    ├── architecture.svg
    ├── research_architecture.svg
    ├── system_architecture.html
    └── architecture_sketch.svg
```

## 🚀 Running the Project

### 1. Backend Setup
```bash
pip install -r requirements.txt
python api.py
```
Backend runs on `http://localhost:8000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Test the System
```bash
curl -X POST http://localhost:8000/api/plan \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Paris",
    "startDate": "2024-06-15",
    "endDate": "2024-06-22",
    "budget": 2000,
    "preferences": ["culture", "food"]
  }'
```

## 📊 Project Stats
- **Total Agents**: 5 (Urban Navigator, Culture Curator, Gastronomy Scout, Budget Balancer, Time Orchestrator)
- **Average Response Time**: 60-90 seconds
- **API Calls**: SerperDev, Google Maps, Web Scraping
- **LLM**: OpenAI GPT-4
- **Framework**: CrewAI v0.203.2

## 📝 Environment Variables
Add to `.env`:
```
OPENAI_API_KEY=sk-...
SERPER_API_KEY=...
GOOGLE_MAPS_API_KEY=...
```

## 🔄 Deployment Notes
- Remove `node_modules` from frontend before pushing (large size)
- Keep docs/ folder for reference but not required for runtime
- All core application files are in root and main subdirectories
