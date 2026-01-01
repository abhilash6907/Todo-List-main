# Full-Stack To-Do List (React + Node + TypeScript)

A complete, assignment-ready full-stack To-Do application with a modern animated UI.

## Tech Stack

- Frontend: React + TypeScript (Vite)
- Styling: TailwindCSS (dark/light theme)
- Animations: Framer Motion + micro-interactions
- Toasts: react-hot-toast
- Backend: Node.js + Express + TypeScript
- Validation: Zod
- Data store: In-memory (assignment-friendly)

## Features

- Home page with card-based task list
- Add task / Task detail page (create, view, edit)
- CRUD operations via REST API
- Mark task complete/incomplete
- Delete task from list or detail view
- Smooth page transitions
- Card animations (load, hover, add, delete)
- Loading skeletons, success/error toasts
- Validation (prevents empty titles)
- Safe handling of invalid task IDs
- Responsive design + dark/light theme toggle

## Project Structure

- `server/` Express API (TypeScript)
- `client/` React app (TypeScript)

## How to Run Locally

### Prerequisites

- Node.js 18+ recommended

### Install

From the project root:

1. Install dependencies:

```bash
npm install
```

2. Start frontend + backend together:

```bash
npm run dev
```

### URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5174
- Health check: http://localhost:5174/health

## API Overview

Base URL: `http://localhost:5174`

### Task shape

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": true
}
```

### Endpoints

- `GET /api/tasks`
  - Returns all tasks

- `GET /api/tasks/:id`
  - Returns a single task
  - `404` if not found

- `POST /api/tasks`
  - Creates a task
  - Body:

```json
{ "title": "...", "description": "...", "completed": false }
```

- `PUT /api/tasks/:id`
  - Updates a task
  - `404` if not found

- `DELETE /api/tasks/:id`
  - Deletes a task
  - `204` on success
  - `404` if not found

## Notes

- The backend uses an in-memory store, so tasks reset when the server restarts.
- The frontend uses Vite dev proxy (`/api`) so you don’t need to manage CORS in development.
