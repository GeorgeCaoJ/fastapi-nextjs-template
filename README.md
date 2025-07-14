# Full Stack FastAPI + Next.js Template
This project offers a well-structured template for developing full stack applications using FastAPI and Next.js, with directory-based cursor rules for clear organization.
- **Backend:** See the [official template repository](https://github.com/fastapi/full-stack-fastapi-template) for backend implementation details.  
- **Web:** The web interface is generated using [V0](https://v0.dev).

## Technology Stack and Features

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) for the Python backend API.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), used by FastAPI, for the data validation and settings management.
    - 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database.
- 🚀 [Next.js](https://nextjs.org) for the web frontend.
    - 🎨 [Shadcn UI](https://ui.shadcn.com) for the UI component library, providing accessible, customizable, and modern React components styled with Tailwind CSS.
    - 🔌 [Orval](https://orval.dev) for generating a fully-typed API client from OpenAPI specs, enabling seamless and type-safe communication between the frontend and backend.
    - 🗂️ [Zustand](https://zustand-demo.pmnd.rs/) for simple, scalable, and fast state management in React, used to manage authentication and other global app state.
- 🐋 [Docker Compose](https://www.docker.com) for development and production.
- 🔒 Secure password hashing by default.
- 🔑 JWT (JSON Web Token) authentication.
- 📫 Email based password recovery.
- ✅ Tests with [Pytest](https://pytest.org).
- 📞 [Traefik](https://traefik.io) as a reverse proxy / load balancer.
- 🚢 Deployment instructions using Docker Compose, including how to set up a frontend Traefik proxy to handle automatic HTTPS certificates.
- 🏭 CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.

## How to use

### Local development
- Clone the repository
- Run `uv sync` in backend to init backend dependencies.
- Run `pnpm install` in web to init frontend dependencies.
- Run `sh scripts/generate-client.sh` to generate API types and client code.
