# KnowledgePilot 🛸

KnowledgePilot is an evidence-backed multi-agent research system designed to synthesize verifiable, cited reports from uploaded documents with full provenance tracking.

---

## 🌟 Key Architecture Highlights

- **Multi-Agent Engine:** Five specialized agents (Research, Analysis, Verification, Report, and Orchestrator) coordinated via a state machine with strict Natural Language Inference (NLI) claim verification.
- **LLM Inference:** Powered exclusively by **Groq** (`llama-3.3-70b-versatile` by default) with JSON mode, bounded backoff, and token/cost observability.
- **Dedicated Vector Search:** Decoupled dense vector layer (using in-process MiniLM or cloud vector embeddings) preserving document IDs, page numbers, and passage tags (`[Doc, p.X, #chunk]`).
- **Deployment Targets:**
  - **Zoho Catalyst Slate:** Static single-page application hosting for the React 19 + Tailwind frontend.
  - **Zoho Catalyst AppSail:** Scalable container runtime for the Node.js Express backend.
- **Monorepo Architecture:** Strict TypeScript contracts shared between client and server via `@knowledgepilot/shared`.

---

## 📂 Monorepo Structure

```text
KnowledgePilot/
├── catalyst.json                 # Zoho Catalyst configuration (Slate + AppSail)
├── package.json                  # Workspaces configuration (packages/*, apps/*)
├── tsconfig.base.json            # Base strict TypeScript configuration
│
├── apps/
│   ├── web/                      # React 19 + Vite + Tailwind CSS (Catalyst Slate)
│   └── server/                   # Express + TypeScript + Groq SDK (Catalyst AppSail)
│       └── app-config.json       # AppSail container runtime definition
│
└── packages/
    └── shared/                   # DTOs, interfaces, and Zod validation schemas
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v20+ LTS
- npm v10+
- A Groq API key from [console.groq.com](https://console.groq.com/keys)

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update your Groq API key:
```env
GROQ_API_KEY=gsk_your_actual_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### 3. Installation & Build
```bash
# Install all dependencies across workspaces
npm install

# Build shared library, backend, and frontend
npm run build
```

### 4. Running Locally
```bash
# Start backend server (defaults to port 3001)
npm run dev:server

# Start frontend dev server (port 5173 with /api proxy)
npm run dev:web
```

### 5. Running Automated Tests
```bash
npm run test
```

---

## ☁️ Zoho Catalyst Deployment

KnowledgePilot is configured for seamless deployment to Zoho Catalyst:
1. `catalyst.json` specifies:
   - `client`: `apps/web/dist` (hosted on Catalyst Slate)
   - `appsail`: `apps/server` (hosted on Catalyst AppSail)
2. `apps/server/app-config.json` configures the AppSail Node runtime.
3. The server dynamically listens on `process.env.X_ZOHO_CATALYST_LISTEN_PORT` in production.
