# ResolveAI — AI-Powered Incident & Customer Issue Resolution Platform

> Convert fragmented customer issues and organizational knowledge into structured, traceable, reusable incident-resolution workflows.

---

## 1. Product Overview

**ResolveAI** is an enterprise AI-assisted incident and customer issue resolution platform designed for modern SaaS companies. The system helps customer support teams understand incoming customer issues, identify similar historical incidents, retrieve relevant organizational knowledge via RAG, generate evidence-backed resolution recommendations, and escalate technically significant issues directly to engineering teams.

The platform continuously learns from **verified incident resolutions** and preserves them into an organizational **Resolution Memory**.

---

## 2. Problem It Solves

Modern SaaS companies receive customer problems across disparate channels (support tickets, bug reports, emails, logs). Often, the exact same underlying engineering issue is described by different customers in completely different wording:

- *"My money was deducted but my order is still pending."*
- *"Payment went through but order confirmation never came."*
- *"UPI transaction successful but order status hasn't changed."*

Traditional keyword matching treats these as distinct issues. ResolveAI employs semantic vector embeddings, metadata filtering, and RAG to correlate related issues, propose verified solutions from past incidents, and streamline support-to-engineering handoffs without hallucinations.

---

## 3. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Lucide Icons, Axios
- **Backend**: Node.js, Express.js (ESM), Helmet, Morgan, CORS, Dotenv
- **Database**: MongoDB Atlas, MongoDB Atlas Vector Search
- **AI & RAG**: Google Gemini API / OpenAI API, text-embedding-004
- **Security**: JWT authentication, bcrypt, Role-Based Access Control (RBAC)

---

## 4. Repository & Monorepo Architecture

```text
ResolveAI/
├── client/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI & Layout Components
│   │   ├── context/            # Global State & Auth Providers
│   │   ├── hooks/              # Custom React Hooks (e.g. useHealth)
│   │   ├── layouts/            # Dashboard & Auth Shells
│   │   ├── pages/              # Route Pages (Dashboard, Tickets, Incidents, etc.)
│   │   ├── services/           # Axios API Client & Endpoints
│   │   ├── types/              # Contract & Type Definitions
│   │   └── utils/              # Class utilities & Helpers
│   └── package.json
├── server/                     # Express.js Backend API
│   ├── src/
│   │   ├── config/             # Environment & MongoDB Connection
│   │   ├── controllers/        # Route Controllers (Thin layer)
│   │   ├── middleware/         # Error Handler, Logger, Auth, RBAC
│   │   ├── models/             # Mongoose Schemas & Vector Definitions
│   │   ├── prompts/            # Versioned AI Prompt Templates
│   │   ├── routes/             # Express API Routes (/api/health, etc.)
│   │   ├── services/           # Business Logic (AI, RAG, Embeddings, Incidents)
│   │   ├── utils/              # Backend Utilities
│   │   └── validators/         # Input & Schema Validators
│   └── package.json
├── shared/                     # Shared Constants, Enums & Type Contracts
├── docs/                       # Architectural & Technical Documentation
├── scripts/                    # Database Seeding & AI Evaluation Scripts
├── .env.example                # Root Environment Variables Template
├── .gitignore                  # Git Ignore Configuration
├── spec.md                     # Product Source of Truth
├── AGENTS.md                   # Engineering Execution Contract
├── package.json                # Root Monorepo Scripts
└── README.md                   # Project Documentation
```

---

## 5. Current Implementation Phase

| Phase | Description | Status |
| :--- | :--- | :--- |
| **Phase 1** | **Repository & Monorepo Architecture Foundation** | **Completed** |
| **Phase 2** | **MongoDB Atlas Models & Schemas** | **Completed** |
| Phase 3 | Authentication & Role-Based Access Control (RBAC) | Pending |
| Phase 4 | Ticket Management System | Pending |
| Phase 5 | AI Provider Abstraction Layer (Gemini / OpenAI) | Pending |
| Phase 6 | AI Ticket Classification & Extraction | Pending |
| Phase 7 | Text Chunking & Embeddings Pipeline | Pending |
| Phase 8 | MongoDB Atlas Vector Search | Pending |
| Phase 9 | RAG Pipeline with Citation Grounding | Pending |
| Phase 10 | Incident Escalation & Lifecycle Management | Pending |
| Phase 11 | Verified Resolution Memory Persistence | Pending |
| Phase 12 | Frontend Full Interactive Dashboard | Pending |
| Phase 13 | Resolution Analytics & Metrics | Pending |
| Phase 14 | AI Evaluation & Benchmark Suite | Pending |
| Phase 15 | Security Hardening & Integration Testing | Pending |
| Phase 16 | Production Deployment | Pending |

> **Note:** Only foundational architecture, API routing, MongoDB connection layer, and responsive SaaS UI shell are active in Phase 1. Subsequent features will be activated in strict accordance with `AGENTS.md`.

---

## 6. Environment Variables

Create a `.env` file in the root directory or configure environment variables in your runtime environment:

```bash
cp .env.example .env
```

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `your-secure-jwt-secret` |
| `LLM_PROVIDER` | Default LLM provider (`gemini` or `openai`) | `gemini` |
| `GEMINI_API_KEY` | Google Gemini API Key | `AIzaSy...` |
| `OPENAI_API_KEY` | OpenAI API Key (optional fallback) | `sk-...` |
| `EMBEDDING_MODEL` | Text embedding model identifier | `text-embedding-004` |
| `CLIENT_URL` | Frontend origin for CORS | `http://localhost:5173` |

---

## 7. Local Setup & Development Commands

### Prerequisites
- **Node.js**: v18.0.0 or higher (v25+ supported)
- **npm**: v9.0.0 or higher

### Installation

Install all dependencies across the monorepo:

```bash
npm install
```

### Running the Application

Start both the Backend API and Frontend Client concurrently:

```bash
npm run dev
```

Or run services individually:

```bash
# Start Backend API (http://localhost:5000)
npm run server

# Start Frontend Client (http://localhost:5173)
npm run client
```

### Health Check

Verify the API status:

```bash
curl http://localhost:5000/api/health
```

Expected JSON response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "service": "ResolveAI API",
    "version": "1.0.0",
    "environment": "development",
    "timestamp": "2026-09-30T...",
    "uptime": 12,
    "database": {
      "state": "disconnected",
      "isConnected": false,
      "hasUriConfigured": false
    }
  }
}
```

---

## 8. License

UNLICENSED — ResolveAI Internal Proprietary.
