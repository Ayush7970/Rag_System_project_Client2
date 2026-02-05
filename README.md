# RAG Agentic System — Frontend

A web UI for running research-style chat conversations against a project knowledge base. The frontend supports project management, conversation threads, document uploads, retrieval settings, and a “sources” experience for grounded answers.

---

## Live Demo

- Production: https://ayush7970.vercel.app/current  

---

## Product Screenshots

> Add these images to the repo (recommended path: `docs/images/`) and keep the same filenames.

![Project chat view](project-chat.png)  
![Knowledge base settings](kb-settings.png)  
![Knowledge base documents](kb-documents.png)

---

## Architecture Diagram (Lucid)

Lucidchart (system + data flow):  
https://lucid.app/lucidchart/8caa218d-8dd2-4dc0-8c86-2fb64fbac522/edit

> Tip: Export your Lucid diagram as PNG and commit it to `docs/diagrams/architecture.png`, then embed it below:
>
> ![Architecture](docs/diagrams/architecture.png)

---

## YouTube Demo

> Replace `YOUR_VIDEO_ID` with your Loom/YouTube video id.

- Demo video: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

(Optional embed preview)

[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=c7OgpAD53sU)

---

## Key Features

- **Projects**
  - Create and browse projects
  - Quick search, grid/list views, and navigation
- **Conversations**
  - Chat threads per project
  - Grounded responses with a **Sources** panel
- **Knowledge Base**
  - Upload and manage documents (PDF/DOCX/PPT/MD/TXT)
  - Retrieval settings (embedding model + search strategy)
  - Tunable parameters like chunks-per-search + context size
- **UX**
  - Loading/error states
  - Document details modal
  - Clear separation of project settings vs documents

---

## Tech Stack

- **React + Vite** (local dev served on `:5173`)
- **Tailwind CSS** (UI styling)
- **Clerk** (authentication)
- **API Client layer** (`@/lib/api`) to talk to the backend

> Note: exact service wiring (env vars/endpoints) is controlled via `.env` and the API client configuration.

---

## Getting Started

### 1) Install

```bash
cd fixed-asset-management-frontend
npm install
```

### 2) Environment Variables

Create `fixed-asset-management-frontend/.env`:

```bash
# Frontend
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_URL=http://localhost:5173

# Auth (Clerk)
VITE_CLERK_PUBLISHABLE_KEY=your_key_here
```

### 3) Run locally

```bash
npm run dev
```

Open:
- http://localhost:5173/current

---

## Scripts

```bash
npm run dev        # start local dev server
npm run build      # production build
npm run preview    # preview prod build
npm run lint       # lint (if configured)
```

---

## Project Structure (Typical)

```txt
fixed-asset-management-frontend/
  src/
    components/
      projects/
      ui/
    lib/
      api.ts
      types.ts
    pages/
    styles/
  public/
  docs/
    images/
    diagrams/
```

---

## How the Frontend Talks to the Backend

The UI calls a backend API for:
- project CRUD
- chat thread CRUD
- document ingestion + indexing
- retrieval/search config
- streaming or non-streaming chat responses
- source attribution (citations)

This is typically routed through `src/lib/api.ts`.

---

## Common Troubleshooting

**Blank screen / auth loop**
- Confirm `VITE_CLERK_PUBLISHABLE_KEY` is set and matches your Clerk project.

**Frontend can’t reach API**
- Confirm `VITE_API_BASE_URL` points to the backend
- Check CORS on backend

**Sources panel shows nothing**
- Confirm documents have finished indexing
- Increase “Final Context Size” or “Chunks per Search” in Knowledge Base settings

---

