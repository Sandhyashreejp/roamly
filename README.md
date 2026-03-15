# ROAMLY - Multi-Agent Travel Itinerary Planner

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Python](https://img.shields.io/badge/python-3.11+-blue)
![Framework](https://img.shields.io/badge/framework-CrewAI-orange)
![LLM](https://img.shields.io/badge/LLM-GPT--4-blue)

ROAMLY is a sophisticated multi-agent system for personalized travel itinerary planning powered by large language models and the CrewAI framework. The system orchestrates five specialized AI agents that work sequentially to generate comprehensive, optimized travel plans considering routes, cultural experiences, dining recommendations, budget constraints, and timing.

## 🎯 Key Features

- **Multi-Agent Architecture**: Five specialized agents (Urban Navigator, Culture Curator, Gastronomy Scout, Budget Balancer, Time Orchestrator) with distinct responsibilities
- **Real-Time Data Integration**: SerperDev API for current information, Google Maps for routing, web scraping for verification
- **LLM-Powered Planning**: OpenAI GPT-4 for intelligent reasoning and context-aware recommendations
- **Pydantic Validation**: Type-safe data models and comprehensive schema validation at each pipeline stage
- **Sequential Orchestration**: Clear task dependencies with context propagation for progressive itinerary refinement
- **Production-Ready**: FastAPI backend with error handling, validation, and performance monitoring
- **Modern Frontend**: React 18 + Vite for responsive, interactive user interface

## 🏗️ System Architecture

```
User Input (City, Dates, Budget, Preferences)
    ↓
Backend API Layer (FastAPI + Pydantic Validation)
    ↓
CrewAI Orchestrator (Task Management & Execution)
    ↓
Multi-Agent LLM Pipeline (Sequential Execution)
    ├─→ Task 1: Urban Navigator (Routes & Attractions)
    ├─→ Task 2: Culture Curator (Cultural Context & Events)
    ├─→ Task 3: Gastronomy Scout (Restaurant Discovery)
    ├─→ Task 4: Budget Balancer (Cost Optimization)
    └─→ Task 5: Time Orchestrator (Schedule Synthesis)
    ↓
External Tools (SerperDev, Google Maps, Web Scraping, OpenAI GPT-4)
    ↓
Final Itinerary Output (JSON-Formatted, Ready to Use)
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+ (for frontend)
- OpenAI API key
- SerperDev API key (Google Search)
- Google Maps API key (optional, for enhanced routing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sandhyashreejp/roamly.git
cd roamly
```

2. **Set up Python environment**
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys:
# OPENAI_API_KEY=sk-...
# SERPER_API_KEY=...
# GOOGLE_MAPS_API_KEY=...
```

4. **Run the backend**
```bash
python api.py
```
Backend available at: `http://localhost:8000`

5. **Set up frontend (optional)**
```bash
cd frontend
npm install
npm run dev
```
Frontend available at: `http://localhost:5173`

## 📊 Project Structure

```
roamly/
├── api.py                    # FastAPI application & routes
├── config.py                 # Configuration management
├── main.py                   # Application entry point
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables
│
├── agents/                   # CrewAI Agent Implementations
│   ├── urban_navigator.py    # Route planning & attractions
│   ├── culture_curator.py    # Cultural insights & events
│   ├── gastronomy_scout.py   # Restaurant discovery & analysis
│   ├── budget_balancer.py    # Cost estimation & optimization
│   └── time_orchestrator.py  # Schedule synthesis & timing
│
├── orchestrator/             # CrewAI Crew Management
│   ├── city_crew.py          # Main orchestration logic
│   └── __init__.py
│
├── tools/                    # External Tool Integrations
│   ├── serper_api.py         # Google Search API wrapper
│   ├── google_maps.py        # Google Maps integration
│   └── web_scraper.py        # Web data extraction utilities
│
├── schemas/                  # Pydantic Data Models
│   ├── itinerary.py          # Itinerary schema
│   ├── attraction.py         # Attraction schema
│   ├── restaurant.py         # Restaurant schema
│   └── __init__.py
│
├── frontend/                 # React 18 + Vite Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
│
└── docs/                     # Documentation & Research
    ├── research/             # Technical reports
    └── diagrams/             # Architecture diagrams
```

## 🔌 API Endpoints

### Plan an Itinerary
```bash
POST /api/plan
Content-Type: application/json

{
  "city": "Paris",
  "startDate": "2024-06-15",
  "endDate": "2024-06-22",
  "budget": 2000,
  "preferences": ["culture", "food", "budget-conscious"]
}
```

**Response:**
```json
{
  "status": "success",
  "itinerary": {
    "city": "Paris",
    "days": [...],
    "totalCost": 1950,
    "attractions": 15,
    "restaurants": 12
  },
  "statistics": {
    "duration_seconds": 72,
    "tokens_used": 6500
  }
}
```

### Get Status
```bash
GET /api/status
```

## 🤖 Agent Specifications

### 1. Urban Navigator
- **Role**: Route planning and attraction discovery
- **Latency**: 15-20 seconds
- **Tools**: Google Maps API, SerperDev
- **Output**: Attractions, routes, travel times

### 2. Culture Curator
- **Role**: Cultural insights and event discovery
- **Latency**: 12-18 seconds
- **Tools**: SerperDev, Web Scraping
- **Output**: Cultural context, events, heritage sites

### 3. Gastronomy Scout
- **Role**: Restaurant discovery and cuisine analysis
- **Latency**: 18-25 seconds
- **Tools**: SerperDev, Google Places, Web Scraping
- **Output**: Restaurant recommendations, reviews, cuisine types

### 4. Budget Balancer
- **Role**: Cost estimation and optimization
- **Latency**: 10-15 seconds
- **Tools**: Google APIs, Cost calculation
- **Output**: Cost breakdown, optimized recommendations

### 5. Time Orchestrator
- **Role**: Schedule synthesis and timeline creation
- **Latency**: 8-12 seconds
- **Tools**: Duration calculation, constraint satisfaction
- **Output**: Hour-by-hour itinerary, realistic timing

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| Average Response Time | 60-90 seconds |
| Total Tokens per Request | 4,000-8,000 |
| Cost per Request | ~$0.22 USD |
| Agents | 5 (sequential execution) |
| Supported Cities | Any |
| Max Trip Duration | 30+ days |

## 🔬 Research Focus

ROAMLY demonstrates key research contributions in agentic AI systems:

1. **Sequential Agent Orchestration** - Clear task dependencies provide interpretability and reliability
2. **Tool Integration Effectiveness** - Direct API integration reduces hallucination vs. pure LLM approaches
3. **Context Propagation** - JSON schema validation ensures data consistency across the agent pipeline
4. **Cost-Quality Trade-offs** - Analysis of GPT-4 vs. GPT-3.5-turbo and API optimization strategies
5. **Multi-Constraint Optimization** - Simultaneously satisfying budget, time, and preference constraints

See `docs/research/` for detailed technical reports and research papers.

## 🛠️ Configuration

### Environment Variables
```bash
OPENAI_API_KEY              # OpenAI API key (required)
OPENAI_MODEL_NAME           # Model selection (default: gpt-4-turbo)
SERPER_API_KEY              # SerperDev API key (required)
GOOGLE_MAPS_API_KEY         # Google Maps API key (optional)
LOG_LEVEL                   # Logging level (default: INFO)
```

### Advanced Configuration
Edit `config.py` to modify:
- LLM model selection
- Temperature and sampling parameters
- API timeouts and retries
- Logging verbosity

## 🧪 Testing

```bash
# Run unit tests
pytest tests/

# Test API endpoints
curl -X POST http://localhost:8000/api/plan \
  -H "Content-Type: application/json" \
  -d '{"city": "Paris", "startDate": "2024-06-15", "endDate": "2024-06-22", "budget": 2000}'

# Check backend health
curl http://localhost:8000/api/status
```

## 📚 Documentation

- **Architecture Diagrams**: See `docs/diagrams/` for system architecture visualizations
- **Technical Report**: `docs/research/ROAMLY_TECHNICAL_REPORT.md` - Comprehensive 35-page research document
- **Project Structure**: `PROJECT_STRUCTURE.md` - Detailed directory organization

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Hierarchical agent execution (parallel agents)
- Advanced caching strategies
- Personalization based on user feedback
- Additional specialized agents (accessibility, sustainability)
- Multi-language support

## ⚠️ Known Limitations

1. **Latency**: 60-90 second response time (acceptable for planning tools, not real-time)
2. **LLM Hallucination**: Some recommendations may be inaccurate despite tool verification
3. **Context Window**: Complex itineraries may exceed token limits
4. **Cost**: ~$0.22 per request limits consumer-scale deployments
5. **API Availability**: Depends on third-party APIs (SerperDev, Google, OpenAI)

## 🗓️ Future Enhancements

- [ ] Hierarchical execution with parallel agents (30-40 sec latency)
- [ ] Real-time booking integration (Booking.com, Airbnb, Viator)
- [ ] User preference learning and personalization
- [ ] Multi-language itinerary generation
- [ ] Accessibility-focused agent specialization
- [ ] Sustainability impact analysis
- [ ] Community itinerary sharing and ratings

## 📊 System Requirements

- **Memory**: 4GB minimum (8GB recommended)
- **Storage**: 500MB for dependencies
- **Network**: Stable internet connection required
- **Python**: 3.11+
- **Node.js**: 16+ (for frontend only)

## 🔐 Security

- API keys stored in `.env` (not tracked in git)
- Pydantic validation prevents injection attacks
- FastAPI CORS configuration for frontend integration
- No persistent user data storage

## 📄 License

This project is provided as-is for research and educational purposes.

## 🙏 Acknowledgments

- **CrewAI**: Multi-agent orchestration framework
- **OpenAI**: GPT-4 language model
- **SerperDev**: Google Search API integration
- **Google**: Maps and Places APIs
- **Pydantic**: Data validation library

## 📧 Contact & Support

For research inquiries, technical issues, or collaborations, please open an issue on GitHub.

---

**Built with research focus on multi-agent LLM systems and agentic AI architectures.**