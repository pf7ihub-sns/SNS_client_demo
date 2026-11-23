# SNS Square - Solution Hub (Client Demo)

React frontend for the SNS Square product showcase. The API lives in a separate project, `Client-demo-backend`.

## Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling & UI**: Tailwind CSS (Lucide-react for icons, clsx for conditional classes)
- **Routing**: React Router DOM (v7)

## Local development

### Prerequisites

- Node.js 18 or newer
- The backend API running on port 5001

### Install and run

```bash
npm install
npm run dev
```

The app is at [http://localhost:5174](http://localhost:5174). Vite proxies `/api` to `http://localhost:5001`, so login works against the local API without setting `VITE_API_BASE_URL`.

For a deployed frontend, set `VITE_API_BASE_URL` to the public API origin before `npm run build`.

## Sharing your local app (ngrok)

Use this to show the app running on your machine to someone else (for example a review with the TPM). One ngrok tunnel serves both the frontend and the API: the frontend runs on its own port and proxies `/api` to your local backend, so everything is same-origin.

1. Start the backend on port 5001 (see the backend repo).
2. Create `vite.share.config.ts` in the project root. Do not commit it; delete it when you are done.

   ```ts
   import react from '@vitejs/plugin-react'
   import { defineConfig } from 'vite'

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5175,
       strictPort: true,
       allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.io'],
       proxy: { '/api': 'http://localhost:5001' },
     },
   })
   ```

3. In Git Bash, start the frontend with an empty API base URL, so the app calls `/api` on the same address as the page:

   ```bash
   VITE_API_BASE_URL="" npx vite --config vite.share.config.ts
   ```

   Do not set this from PowerShell. An empty variable is dropped there, the app falls back to `.env` (`http://localhost:5001`), and login fails with "Failed to fetch" for everyone except you.

4. In a second terminal, start the tunnel:

   ```bash
   ngrok http 5175
   ```

5. Copy the `https://….ngrok-free.app` address that ngrok prints (or open `http://127.0.0.1:4040`) and send it.

Notes:

- The ngrok free plan shows a "Visit Site" warning page the first time. Click through it once.
- The address changes every time ngrok restarts.
- Quick check: `<ngrok-address>/api/health` should return `{"status":"ok", ...}`.
- The shared app uses your local backend and whatever database it is configured for.
- When you are done, stop ngrok and the Vite server, and delete `vite.share.config.ts`.

## Docker

The image builds the React app and serves the static files with nginx.

```bash
docker build -t sns-square-frontend:latest .
docker run -p 8080:80 sns-square-frontend:latest
```

## CI/CD

`Jenkinsfile` installs dependencies, builds the React app, uploads `dist/` to S3, and invalidates CloudFront. `VITE_API_BASE_URL` is set in that pipeline so the built app calls the deployed API.

## Project structure

```text
.
├── src/                 # React application
│   ├── components/
│   ├── data/
│   ├── pages/
│   └── App.tsx
├── Dockerfile           # Frontend image
├── Jenkinsfile          # Frontend deploy pipeline
├── nginx.conf           # SPA routing for the Docker image
├── package.json
└── vite.config.ts       # Dev server and /api proxy
```
