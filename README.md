# SNS Square - Solution Hub (Client Demo)

This is the internal repository for the **SNS Square Product Showcase** platform. It acts as a central hub presenting various enterprise solutions (Security, Compliance, AI & Automation, Data & Analytics).

## 🏗 Architecture & Tech Stack

This project is structured as a full-stack JavaScript/TypeScript application, combining a modern React frontend with a robust Node.js backend.

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling & UI**: Tailwind CSS (Lucide-react for icons, clsx for conditional classes)
- **Routing**: React Router DOM (v7)

### Backend
- **Runtime**: Node.js (v22+)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT & bcrypt

### DevOps & Infrastructure
- **Containerization**: Docker (Multi-stage build)
- **CI/CD**: Jenkins

---

## 🚀 Local Development Setup

To run this project locally, follow these steps:

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or Atlas URI)

### 2. Environment Variables

Create a `.env` file inside the `server/` directory and configure the following variables:

```env
PORT=5001
MONGODB_URI=mongodb://[your-connection-string]
FRONTEND_URL=http://localhost:5173
```
> Note: Refer to `server/.env.example` if available.

### 3. Installation

You need to install dependencies for both the frontend and backend.

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 4. Running the Application

This project uses `concurrently` to run both the frontend (Vite) and backend (Express) development servers simultaneously from the root folder.

```bash
# Start both frontend and backend servers
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001/api](http://localhost:5001/api)

---

## 🐳 Docker Deployment

The project includes a multi-stage `Dockerfile` which builds the React frontend and serves it as static files via the Express backend.

```bash
# Build the Docker image
docker build -t sns-square-solution-hub:latest .

# Run the container
docker run -p 5001:5001 --env-file server/.env sns-square-solution-hub:latest
```

## 🔄 CI/CD Pipeline

The repository includes a `Jenkinsfile` for automated builds. 
The pipeline stages include:
1. **Clean Workspace & Checkout**
2. **Build Docker Image** (Tagged with `BUILD_ID`)
3. **Security Scan** (Placeholder for Trivy / SonarQube)
4. **Deploy** (To be configured with internal orchestration logic, e.g., AWS ECS)

---

## 📂 Project Structure

```text
.
├── server/                 # Express backend application
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints (auth, etc.)
│   ├── middleware/         # Express middlewares
│   ├── server.js           # Backend entry point
│   └── package.json        # Backend dependencies
├── src/                    # React frontend application
│   ├── components/         # Reusable UI components
│   ├── data/               # Mock data (mockData.ts) and types (models.ts)
│   ├── pages/              # Route pages (ProductDetailPage, etc.)
│   └── App.tsx             # Main React component
├── Dockerfile              # Production multi-stage build configuration
├── Jenkinsfile             # Jenkins CI/CD pipeline
├── package.json            # Root configuration & concurrent scripts
└── vite.config.ts          # Vite configuration and proxy setup
```
