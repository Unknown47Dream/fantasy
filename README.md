# Esports Fantasy Game

A TypeScript-based full-stack esports fantasy game platform designed primarily as a **Telegram Mini App**, with potential future expansion into a blockchain dApp.

## 🏗️ Tech Stack

### Frontend

- **Next.js 15** (React + TypeScript)
- **TailwindCSS** for styling
- Server Components and modern React patterns

### Backend

- **NestJS 11** (TypeScript)
- RESTful API architecture
- Dependency Injection and modular design

### Database

- **PostgreSQL**

### Infrastructure

- **Docker Compose** for local development and orchestration
- CI/CD deployment to private VPS (planned)

## 📁 Project Structure

```
fantasy/
├── backend/          # NestJS application
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── frontend/         # Next.js application
│   ├── app/
│   ├── components/
│   ├── package.json
│   ├── next.config.ts
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

Each subproject (frontend/backend) is self-contained with its own dependencies and configuration.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **Docker** and **Docker Compose**
- **PostgreSQL** (or use Docker Compose)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fantasy
   ```

2. **Install dependencies for backend**

   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running with Docker Compose

```bash
# From the root directory
docker-compose up
```

This will start:

- PostgreSQL database
- Backend API server
- Frontend application

### Running Locally (Development)

**Backend:**

```bash
cd backend
npm run start:dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

## 🔧 Configuration

Each project uses `.env` files for configuration:

- `backend/.env` - Backend environment variables
- `frontend/.env.local` - Frontend environment variables

Refer to `.env.example` files in each directory for required variables.

## 🧪 Testing

**Backend:**

```bash
cd backend
npm run test
npm run test:e2e
```

**Frontend:**

```bash
cd frontend
npm run test
```

## 📦 Deployment

Deployment is configured for a private VPS using Docker Compose and GitHub Actions (CI/CD pipeline in progress).

## 🛣️ Roadmap

- [x] Initial project setup with TypeScript
- [x] Docker Compose orchestration
- [ ] PostgreSQL integration with Prisma/TypeORM
- [ ] Redis for caching and sessions
- [ ] RabbitMQ for async job processing
- [ ] Telegram Mini App integration
- [ ] Blockchain integration (Solana/TON)
- [ ] CI/CD pipeline for automated deployment

## 🤝 Contributing

This is a private project. Contributions are by invitation only.

## 📄 License

Proprietary - All rights reserved.

## 👤 Author

Created for the Esports Fantasy Game platform.
