# Sample App

Full-stack starter application with a React (Vite) frontend and FastAPI backend.

This project is configured for:

- local development (frontend + backend)
- Docker development with bind mounts
- Docker production profile with Nginx serving built frontend assets

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Quick start (local)](#quick-start-local)
- [Configuration](#configuration)
- [Run with Docker](#run-with-docker)
- [API reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Common commands](#common-commands)

## Features

- React frontend with a simple backend health status UI
- FastAPI backend with a health endpoint
- CORS configuration for local and Docker-based origins
- Docker Compose profiles for both development and production frontend modes
- Makefile wrapper for common Docker Compose workflows

## Tech stack

- Frontend: React, Vite
- Backend: Python 3.12, FastAPI, Uvicorn
- Containers: Docker, Docker Compose
- Production static serving: Nginx

## Project structure

```text
sample-app/
	backend/
		app/
			main.py
		requirements.txt
		Dockerfile
	frontend/
		src/
			App.jsx
			main.jsx
		Dockerfile
		Dockerfile.prod
		nginx.conf
		package.json
	docker-compose.yml
	Makefile
	README.md
```

## Quick start (local)

### Prerequisites

- Python 3.12+
- Node.js 20+
- npm

### 1) Start backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend health URL:

- http://localhost:8000/health

### 2) Start frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

- http://localhost:5173

When running normally, the frontend fetches backend health from:

- http://localhost:8000/health

## Configuration

### Frontend environment variable

Use `VITE_API_URL` to override backend URL:

```bash
VITE_API_URL=http://your-backend-host:port npm run dev
```

### Backend CORS

Allowed local origins are configured in `backend/app/main.py` for:

- localhost and 127.0.0.1 ports 5173, 5174, and 8080

## Run with Docker

The compose stack exposes:

- Backend on host port `8001`
- Dev frontend on host port `5174` (Vite, hot reload)
- Prod frontend on host port `8080` (Nginx)

### Option A: Use Makefile wrapper (recommended)

Development profile:

```bash
make stack ACTION="up -d --build" PROFILE=dev
make stack ACTION="logs -f" PROFILE=dev
make stack ACTION="down" PROFILE=dev
```

Production profile:

```bash
make stack ACTION="up -d --build" PROFILE=prod
make stack ACTION="logs -f" PROFILE=prod
make stack ACTION="down" PROFILE=prod
```

### Option B: Use docker compose directly

Development profile:

```bash
sudo docker compose --profile dev up -d --build
sudo docker compose --profile dev ps
sudo docker compose --profile dev down
```

Production profile:

```bash
sudo docker compose --profile prod up -d --build
sudo docker compose --profile prod ps
sudo docker compose --profile prod down
```

### Docker endpoints

- Backend health: http://localhost:8001/health
- Dev frontend: http://localhost:5174
- Prod frontend (Nginx): http://localhost:8080
- Prod proxied health: http://localhost:8080/api/health

## API reference

### GET /health

Checks service availability.

Example response:

```json
{
	"status": "ok"
}
```

## Troubleshooting

### Frontend shows "Failed to fetch"

- Ensure backend is running and reachable.
- Confirm `VITE_API_URL` points to the correct backend URL.
- If using Docker prod frontend, test `http://localhost:8080/api/health`.

### CORS errors in browser console

- Confirm frontend origin is included in backend CORS allow list.
- Restart backend (or let reload pick up changes) after editing CORS config.

### Docker permission denied on `/var/run/docker.sock`

Run compose commands with `sudo`, or add your user to the Docker group.

## Common commands

Local backend:

```bash
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Local frontend:

```bash
cd frontend && npm run dev -- --host 0.0.0.0 --port 5173
```

Compose status:

```bash
sudo docker compose ps
```

Compose logs:

```bash
sudo docker compose logs -f
```
