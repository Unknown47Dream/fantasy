# GitHub Copilot Instructions

## 🧠 Project Overview
This repository contains a **TypeScript-based full-stack project** for an **Esports Fantasy Game** designed primarily for a **Telegram Mini App**, with potential future expansion into a **blockchain dApp**.

### Tech Stack
- **Frontend:** Next.js 15 (React + TypeScript)
- **Backend:** NestJS 11 (TypeScript)
- **Database:** PostgreSQL
- **Future Integrations (Optional):** Redis, RabbitMQ
- **Infrastructure:** Docker Compose for orchestration, private VPS deployment planned via CI/CD

### Folder Structure
```
root/
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
│   ├── next.config.js
│   └── Dockerfile
│
├── docker-compose.yml
└── .github/
    └── copilot-instructions.md
```

Each project is self-contained with its own `package.json`, configuration, and Dockerfile. The parent directory only contains orchestration files like `docker-compose.yml`.

---

## ⚙️ Coding Conventions

### General Guidelines
- Use **TypeScript** strictly (`noImplicitAny`, `strictNullChecks`).
- Follow **default ESLint** and **Prettier** rules for both frontend and backend.
- Prefer **readable and maintainable code** over clever one-liners.
- Include **minimal inline comments** only where necessary.
- Prefer **async/await** over promise chaining.

### NestJS Backend Rules
- Use the standard NestJS module-service-controller structure.
- Use **DTOs** and **validation pipes** for all input validation.
- Always include **try/catch** with meaningful error messages in service logic.
- Use **Dependency Injection** for services.
- Separate **business logic** from **controllers**.
- Follow naming convention: `SomethingService`, `SomethingController`, `SomethingModule`.

### Next.js Frontend Rules
- Use **functional components** and **React hooks**.
- Prefer **Server Components** where possible (Next.js 15 best practices).
- Use **TailwindCSS** for styling.
- Keep components small and modular.
- Fetch data using **Next.js server actions** or **React Query** (if applicable).
- Handle API calls through `/api` routes that proxy to the backend.

---

## 🧩 Architecture Conventions
- **No shared package.json** — each subproject manages dependencies independently.
- Keep **backend and frontend loosely coupled** (communicate over REST/GraphQL).
- **Docker Compose** coordinates:
  - PostgreSQL database
  - Backend and frontend containers
- Use `.env` files per project for configuration.
- Future-proof structure for adding:
  - Redis (for caching/sessions)
  - RabbitMQ (for queue-based jobs)

---

## 🧱 CI/CD and Deployment
- Will later use **GitHub Actions** to deploy automatically to a **private VPS**.
- Copilot should assume a **Docker-first workflow**.
- Generate scripts compatible with **Linux-based VPS environments**.
- Use environment variables for secrets and connection strings.

---

## 💡 Copilot Behavior Guidelines
- When generating new code, Copilot should:
  - Suggest TypeScript-based solutions only.
  - Assume Docker Compose orchestration.
  - Use PostgreSQL for database access (via Prisma or TypeORM).
  - Add validation and error handling by default.
  - Favor maintainability over brevity.

- When generating frontend components:
  - Use React functional components with TypeScript.
  - Follow Next.js 15 conventions.
  - Include Tailwind classes for styling.

---

## 🧭 Future Extensions
- Integration with Redis for caching user sessions and game data.
- RabbitMQ for async processing (e.g., background jobs for score updates).
- Potential Solana or TON blockchain integration for token-based rewards.
- Additional deployment environments for scaling and versioning.

---

## 📘 Usage Guide

### 1. Location
Place this file in your repo at:
```
.github/copilot-instructions.md
```

### 2. Purpose
GitHub Copilot reads this file to align its code suggestions with your project conventions and structure.

### 3. Behavior
When working inside this repo:
- Copilot will prefer NestJS conventions in `backend/`.
- Copilot will prefer Next.js + Tailwind in `frontend/`.
- Copilot will suggest TypeScript-only code.
- Copilot will assume Docker-based dev and deploy workflows.

### 4. Optional Enhancements
You can later extend this file with:
- Naming conventions for commits or branches.
- Testing patterns (e.g., Jest, Playwright).
- Deployment targets or VPS details.

---

**Author's Note:**
This configuration is designed for clarity and scalability. As your Esports Fantasy Game grows, you can evolve this file to guide Copilot on new technologies or coding patterns.
