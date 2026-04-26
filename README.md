# Local Todo App

Vite React + Tailwind frontend, NestJS backend, and PostgreSQL for local development.

## Requirements

- Node.js 20+
- npm
- Docker Desktop or another PostgreSQL instance

## Run locally

```bash
npm install
cp backend/.env.example backend/.env
npm run db:up
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Open from a phone on the same network

1. Find your computer IP address on the local network.
2. Start both apps bound to all interfaces:

```bash
npm run dev:network
```

3. Open `http://YOUR_COMPUTER_IP:5173` on your phone.

By default the frontend calls the backend on the same host at port `3000`. If you need to override it, create `frontend/.env.local`:

```bash
VITE_API_URL=http://YOUR_COMPUTER_IP:3000
```

Also add your phone-facing frontend URL to `backend/.env`:

```bash
FRONTEND_ORIGIN=http://localhost:5173,http://YOUR_COMPUTER_IP:5173
```

For quick local development only, you can use `FRONTEND_ORIGIN=*`.

## Prompt Log

Conversation notes are kept in `prompts/conversation.md`. I added the initial request there. Since I cannot persistently watch future chat messages outside this session, continue appending important prompts to that file when you want the project history preserved.

## CI Pipeline

GitHub Actions workflow is defined in `.github/workflows/ci.yml`.

It runs on pushes to `main`/`master` and on pull requests:

```bash
npm ci
npm run test -w backend
npm run test -w frontend
npm run build
```
