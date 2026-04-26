# Todo Backend

NestJS API for the local todo app. It exposes CRUD endpoints for todo items and stores data in PostgreSQL through TypeORM.

## Stack

- NestJS
- TypeORM
- PostgreSQL
- class-validator / class-transformer
- Jest

## Environment

Create a local env file from the example:

```bash
cp backend/.env.example backend/.env
```

Required values:

```bash
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=todo
DATABASE_PASSWORD=todo
DATABASE_NAME=todo_app
FRONTEND_ORIGIN=http://localhost:5173
```

For quick local network testing, `FRONTEND_ORIGIN=*` is allowed. For stricter local use, set comma-separated origins such as:

```bash
FRONTEND_ORIGIN=http://localhost:5173,http://YOUR_COMPUTER_IP:5173
```

## Database

From the repository root:

```bash
npm run db:up
```

The project maps PostgreSQL to host port `5433` to avoid conflicts with a local PostgreSQL already using `5432`.

Stop the database:

```bash
npm run db:down
```

## Run

From the repository root:

```bash
npm run dev -w backend
```

The API runs at:

```text
http://localhost:3000
```

For local network use, the backend already listens on `0.0.0.0` in `src/main.ts`.

## API

### Get Todos

```http
GET /todos
```

Response:

```json
[
  {
    "id": "uuid",
    "title": "Buy milk",
    "completed": false,
    "createdAt": "2026-04-26T00:00:00.000Z",
    "updatedAt": "2026-04-26T00:00:00.000Z"
  }
]
```

### Create Todo

```http
POST /todos
Content-Type: application/json
```

Body:

```json
{
  "title": "Buy milk"
}
```

### Update Todo

```http
PATCH /todos/:id
Content-Type: application/json
```

Body:

```json
{
  "completed": true
}
```

You can also update `title`.

### Delete Todo

```http
DELETE /todos/:id
```

Response:

```json
{
  "deleted": true
}
```

## Validation

Incoming requests use a global `ValidationPipe` with:

- `whitelist: true`
- `forbidNonWhitelisted: true`
- `transform: true`

Todo titles are trimmed before validation and must be 1-160 characters.

## Scripts

```bash
npm run dev -w backend
npm run build -w backend
npm run start -w backend
npm run test -w backend
```

## Code Notes

- `TodosController` owns HTTP routing only.
- `TodosService` owns todo business logic and persistence calls.
- DTOs define validation rules.
- `Todo` entity defines the PostgreSQL table shape.
- Config is read from environment variables to keep the app local-deploy friendly.
