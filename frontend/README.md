# Todo Frontend

Vite React frontend for the local todo app. It is designed to work on desktop and mobile browsers, including phones on the same local network.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- lucide-react
- Vitest
- Testing Library

## Run

From the repository root:

```bash
npm run dev -w frontend
```

Default local URL:

```text
http://localhost:5173
```

For phone testing on the same Wi-Fi/network:

```bash
npm run dev:network -w frontend
```

Vite will print a network URL such as:

```text
http://YOUR_COMPUTER_IP:5173
```

Open that URL from your phone.

## Backend URL

By default, the frontend calls the backend on the same host at port `3000`.

Examples:

- Page opened at `http://localhost:5173` calls `http://localhost:3000`
- Page opened at `http://192.168.1.10:5173` calls `http://192.168.1.10:3000`

To override this, create `frontend/.env.local`:

```bash
VITE_API_URL=http://localhost:3000
```

For phone testing:

```bash
VITE_API_URL=http://YOUR_COMPUTER_IP:3000
```

## Features

- Add a todo
- Mark a todo complete or active
- Delete a todo
- Filter by `All`, `Active`, and `Done`
- Show task totals
- Responsive layout for mobile and desktop
- User-facing error messages when the backend cannot be reached

## Main Files

```text
src/App.tsx        Main todo screen and UI state
src/api.ts         HTTP client for the NestJS backend
src/types.ts       Shared frontend todo types
src/styles.css     Tailwind entry and base styles
```

## Scripts

```bash
npm run dev -w frontend
npm run dev:network -w frontend
npm run build -w frontend
npm run preview -w frontend
npm run test -w frontend
```

## Testing

Run:

```bash
npm run test -w frontend
```

The current test checks that the main todo workspace renders and handles an empty list state.

## Build

Run:

```bash
npm run build -w frontend
```

The production output is generated in:

```text
frontend/dist
```

## Code Notes

- Keep UI components small and readable.
- Keep API calls in `src/api.ts` instead of mixing fetch logic into many components.
- Keep TypeScript types in `src/types.ts`.
- Use Tailwind utility classes consistently and avoid one-off CSS unless the style is shared or global.
