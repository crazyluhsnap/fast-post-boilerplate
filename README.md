# Boilerplate #1 — React + Vite + FastAPI + PostgreSQL + Docker

A reusable full-stack boilerplate for hackathon projects.

It provides:

- React + Vite frontend
- FastAPI backend
- PostgreSQL database
- SQLAlchemy ORM
- Docker Compose for PostgreSQL
- Pydantic request/response schemas
- REST API CRUD example
- CORS configuration
- Environment-based configuration
- Git-ready project structure

The included **Item CRUD module** is only a demonstration. For an actual hackathon problem, replace it with the required domain modules while keeping the infrastructure.

---

## Prerequisites

Install the following before starting:

- Git
- Python 3.10+
- Node.js and npm
- Docker Desktop

Verify the installations:

```bash
git --version
python --version
node --version
npm --version
docker --version
```

---

## Project Structure

```text
fast_post/
├── .gitignore
├── docker-compose.yml
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   │
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       │
│       ├── core/
│       │   ├── __init__.py
│       │   └── config.py
│       │
│       ├── db/
│       │   ├── __init__.py
│       │   └── database.py
│       │
│       ├── models/
│       │   ├── __init__.py
│       │   └── item.py
│       │
│       ├── routers/
│       │   ├── __init__.py
│       │   ├── health.py
│       │   └── items.py
│       │
│       └── schemas/
│           ├── __init__.py
│           └── item.py
│
└── frontend/
    ├── .env
    ├── .env.example
    ├── package.json
    ├── package-lock.json
    └── src/
        ├── api/
        │   └── client.js
        ├── components/
        │   ├── ItemForm.jsx
        │   └── ItemList.jsx
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

## 1. Clone the Repository

Clone the repository and enter the project directory:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd fast_post
```

---

## 2. Start PostgreSQL with Docker

From the project root:

```bash
docker compose up -d
```

Check that PostgreSQL is running:

```bash
docker compose ps
```

The database configuration used by this boilerplate is:

| Setting | Value |
|---|---|
| Host | `localhost` |
| Port | `5432` |
| Database | `hackathon_db` |
| User | `postgres` |
| Password | `postgres` |

PostgreSQL runs inside Docker, while the FastAPI application connects to it through `localhost:5432`.

---

## 3. Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### Environment Variables

Create `backend/.env` using `backend/.env.example` as a template.

Add:

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/hackathon_db
```

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

`http://localhost:8000`

Swagger API documentation:

`http://localhost:8000/docs`

---

## 4. Frontend Setup

Open another terminal.

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `frontend/.env` using `frontend/.env.example` as a template.

Add:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Start the React development server:

```bash
npm run dev
```

The frontend will be available at:

`http://localhost:5173`

---

## 5. Run the Complete Stack

You will normally use three terminals.

### Terminal 1 — PostgreSQL

From the project root:

```bash
docker compose up -d
```

### Terminal 2 — FastAPI

```bash
cd backend
```

Activate the virtual environment:

```powershell
venv\Scripts\activate
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

### Terminal 3 — React

```bash
cd frontend
npm run dev
```

The complete architecture is:

```text
React
  ↓
REST API
  ↓
FastAPI
  ↓
SQLAlchemy
  ↓
PostgreSQL
  ↑
Docker
```

---

## 6. Available API Endpoints

### Health

```http
GET /api/health/
```

### Items

```http
POST   /api/items/
GET    /api/items/
GET    /api/items/{item_id}
PUT    /api/items/{item_id}
DELETE /api/items/{item_id}
```

The Item endpoints are a working CRUD example.

For a hackathon project, they can be replaced with domain-specific endpoints depending on the problem statement.

---

## 7. Environment Variables

### Backend

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/hackathon_db
```

### Frontend

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> **Important:** Never commit real `.env` files containing secrets or sensitive configuration.

The repository contains `.env.example` files so that required environment variables are documented without exposing local configuration.

---

## 8. Stopping and Restarting PostgreSQL

When you are finished working, stop the PostgreSQL container:

```bash
docker compose stop
```

This stops the container while preserving the database volume and its data.

To start it again:

```bash
docker compose start
```

To stop and remove the containers while preserving the database volume:

```bash
docker compose down
```

### ⚠️ Be careful with this command

```bash
docker compose down -v
```

The `-v` option removes the PostgreSQL volume.

This means the database data stored in that volume will be deleted.

Only use it when you intentionally want to reset the database.

---

## 9. Common Troubleshooting

### Database Connection Error

Make sure:

1. Docker Desktop is running.
2. PostgreSQL is running.

Check:

```bash
docker compose ps
```

Make sure `DATABASE_URL` is:

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/hackathon_db
```

### Frontend Cannot Reach Backend

Make sure FastAPI is running:

```bash
uvicorn app.main:app --reload
```

Check:

`http://localhost:8000`

Also verify `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Use:

`http://localhost:8000/api`

**not:**

`https://localhost:8000/api`

The development FastAPI server uses HTTP.

### Python Dependency Issues

From the backend directory:

```bash
cd backend
```

Activate the virtual environment:

```powershell
venv\Scripts\activate
```

Install dependencies again:

```bash
pip install -r requirements.txt
```

### Frontend Dependency Issues

From the frontend directory:

```bash
cd frontend
```

Run:

```bash
npm install
```

Then:

```bash
npm run dev
```

### Port Already in Use

If you get a port conflict, check whether another application is already using:

- `8000` → FastAPI
- `5173` → Vite
- `5432` → PostgreSQL

Stop the conflicting process or change the relevant port configuration.

---

## 10. Git Workflow

After making changes:

```bash
git status
```

Stage the changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe your change"
```

Push:

```bash
git push
```

Before committing, make sure the following are not being tracked:

```text
.env
venv/
node_modules/
```

The `.gitignore` file is configured to prevent these from being committed.

---

## 11. Using This Boilerplate for a Hackathon

This boilerplate is intentionally generic.

When starting a new problem statement:

1. Keep the existing project infrastructure.
2. Replace the Item example with problem-specific models, schemas, routers, and UI.
3. Add authentication/RBAC if the problem requires it.
4. Add AI/ML modules separately from the core API where practical.
5. Keep deterministic business rules in the backend.
6. Add audit logging where required.
7. Build the MVP first.
8. Add optional features only after the MVP is stable.
9. Keep API contracts clear between frontend and backend.
10. Update the README as the project architecture changes.

The goal is to avoid spending valuable hackathon time rebuilding basic infrastructure and instead focus on solving the actual problem statement.

---

## 12. Tech Stack

### Frontend

- React
- Vite
- JavaScript

### Backend

- FastAPI
- Python
- Pydantic
- SQLAlchemy

### Database

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose

### Development

- Git
- GitHub

---

## 13. Quick Start

For future reuse, the shortest setup is:

### Clone

```bash
git clone <REPOSITORY-URL>
cd fast_post
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Backend

```bash
cd backend
python -m venv venv
```

Windows PowerShell:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` from `.env.example`, then:

```bash
uvicorn app.main:app --reload
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- FastAPI: `http://localhost:8000`
- Swagger: `http://localhost:8000/docs`

---

## 14. Architecture Summary

```text
                    ┌─────────────────┐
                    │   React + Vite  │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                             │ REST API
                             ↓
                    ┌─────────────────┐
                    │     FastAPI     │
                    │     Backend     │
                    └────────┬────────┘
                             │
                             │ SQLAlchemy
                             ↓
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
                             ↑
                             │
                    ┌─────────────────┐
                    │ Docker Compose  │
                    └─────────────────┘
```

---