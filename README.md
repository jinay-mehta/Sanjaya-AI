<p align="center">
  <img src="./frontend/public/image.png" width="200" alt="Sanjaya AI Logo" />
</p>

# 🚀 Sanjaya AI — Agentic AI Platform for Pharmaceutical Innovation Discovery  
**Automated Multi-Agent System for Drug Repurposing, Market Intelligence, Patent Landscaping & Clinical Trials**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Latest-1C3C3C?style=flat-square&logo=langchain&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)

---

## 📌 Overview  

**Sanjaya AI** automates pharmaceutical molecule evaluation and drug repurposing research. Traditional manual evaluation requires 2–3 months of cross-functional research across regulatory databases, clinical trial registries, scientific papers, trade statistics, and patent registers. Sanjaya AI condenses this into real-time, automated multi-agent workflows.

---

## 🧩 System Architecture

<p align="center">
  <img src="./frontend/public/architecture_diagram.png" alt="Sanjaya AI Architecture Diagram" width="85%" />
</p>

```mermaid
graph TD
    User([👤 User Query]) --> Master[🧭 Master Agent / Router Node]
    Master --> |Task Decomposition| Workers{⚡ Specialized Worker Agents}
    
    Workers --> W1[📊 IQVIA Market Insights]
    Workers --> W2[🚢 EXIM Global Trade]
    Workers --> W3[📜 Patent Landscape]
    Workers --> W4[🧬 Clinical Trials]
    Workers --> W5[📚 Internal Knowledge]
    Workers --> W6[🌐 Web Intelligence]
    
    W1 & W2 & W3 & W4 & W5 & W6 --> Synth[🧠 Master Synthesizer Node]
    Synth --> Report[📑 Report Generator Agent]
    Report --> Final([✨ Executive Dashboard & Downloadable PDF])
```

---

## 🧠 Autonomous Agents

| Agent | Core Function | Data Sources / Tools |
| :--- | :--- | :--- |
| **🧭 Master Agent** | Query decomposition, routing & synthesis | LangGraph, Gemini 2.5 Flash, FastAPI |
| **📊 IQVIA Insights** | Sales volume, revenue trends, CAGR & competitors | Supabase SQL, Commercial datasets |
| **🚢 EXIM Trends** | Global trade flow, sourcing dependencies & trade balance | UN Comtrade API, Trade calculators |
| **📜 Patent Landscape** | Active patent scanning, assignees & expiry timelines (FTO) | Patent SQL tools, Supabase database |
| **🧬 Clinical Trials** | Active trials, phase distributions & lead sponsors | ClinicalTrials.gov API v2 |
| **🌐 Web Intelligence** | Scientific papers, medical guidelines & news | EuropePMC Search API, Web scrapers |
| **📚 Internal Knowledge** | Enterprise document analysis & corporate takeaways | Document parser, Gemini Multimodal |
| **📑 Report Generator** | Executive briefing PDF compilation with charts & tables | ReportLab PDF engine |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide Icons
- **Backend**: FastAPI, LangGraph, Python 3.11+, ReportLab
- **AI & Models**: Google Gemini via OpenAI-compatible endpoints
- **Database & Storage**: Supabase (PostgreSQL)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/jinay-mehta/Sanjaya-AI.git
cd Sanjaya-AI
```

### 2. Backend Setup
```bash
cd backend

# Setup virtual environment
python -m venv .venv

# Windows (PowerShell):
.venv\Scripts\Activate.ps1

# macOS / Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Configuration
Create `backend/.env` from `.env.example`:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_key_here
```

### 4. Upload Datasets to Supabase

**Via Web UI:**
1. Go to Supabase Dashboard → **Storage**
2. Create bucket: `datasets`
3. Upload `patents.csv` and `iqvia.csv`

**Via CLI:**
```bash
supabase storage cp ./data/patents.csv datasets/patents.csv
supabase storage cp ./data/iqvia.csv datasets/iqvia.csv
```

### 5. Start Backend Server
```bash
cd backend
uvicorn main:app --reload --port 8000
```
Backend API will run at `http://127.0.0.1:8000`.

### 6. Start Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend will be accessible at `http://localhost:8080`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
