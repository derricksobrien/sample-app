# sample

Full-stack starter with a React (Vite) frontend and FastAPI backend.

## Structure

- `frontend/` React + Vite app
- `backend/` FastAPI app

## Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health endpoint:

- `GET http://localhost:8000/health`

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

- `http://localhost:5173`

If backend is not on `http://localhost:8000`, set:

```bash
VITE_API_URL=http://your-backend-host:port npm run dev
```

## Run both locally

1. Start backend on port `8000`.
2. Start frontend on port `5173`.
3. Open the frontend and confirm backend status appears as `online`.
