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
