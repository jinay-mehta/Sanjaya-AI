# 🚀 Sanjaya AI — Frontend Interface

Modern, reactive web application for **Sanjaya AI** — an AI-driven agentic platform for automated pharmaceutical research and market intelligence.

## 🌟 Overview

The Sanjaya AI frontend provides an intuitive conversational and dashboard interface for pharmaceutical researchers, R&D teams, and business intelligence analysts. It streams live execution progress from specialized domain agents and visualizes multidimensional data (market sizing, clinical trial pipelines, patent landscape, trade trends, internal knowledge, and web intelligence).

## ✨ Features

- 💬 **Live Multi-Agent Chat Interface**: Direct natural-language queries with real-time SSE streaming.
- 📊 **Dynamic Research Progress Tracker**: Real-time status indicators for each specialized worker agent.
- 🧬 **Clinical Trial Landscape Explorer**: Active trials, sponsor analytics, phase distribution visualizations, and direct ClinicalTrials.gov links.
- 📈 **Commercial & Market Intelligence**: IQVIA market sales, regional breakdown, volume metrics, and CAGR analysis.
- 🚢 **EXIM Global Trade Trends**: Trade balance, import dependency ratios, and top trade partners.
- 📜 **Patent Landscape & FTO Analysis**: Expiry tracking, assignee mapping, and freedom-to-operate checks.
- 📚 **Internal Strategy & Document Intelligence**: Internal briefing reports, comparative tables, and corporate takeaways.
- 🌐 **Scientific Web & Literature Intelligence**: Hyperlinked journal extracts, verified quotations, and practice guidelines.
- 📑 **Instant PDF Report Generation**: One-click download of executive briefings and synthesized research decks.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **State & Routing**: React Router DOM + TanStack Query

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Create `.env` if you wish to customize the backend URL (default is `http://localhost:8000`):
```env
VITE_API_URL=http://localhost:8000
```

### 3. Start Development Server
```bash
npm run dev
```

The frontend will run locally at `http://localhost:8080` (or the port specified in `vite.config.ts`).
