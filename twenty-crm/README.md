# Twenty CRM

Open-source CRM platform for managing customers, contacts, and business relationships.

## Services

| Service | Port | Description |
|---------|------|-------------|
| Server | 3000 | Main application server |
| Worker | - | Background job processor |
| PostgreSQL | 5432 | Database (internal) |
| Redis | 6379 | Cache & job queue (internal) |

## Quick Start

```bash
cp .env .env.local  # Edit with your values
docker compose up -d
```

## Configuration

Key environment variables (see `.env`):

| Variable | Description | Default |
|----------|-------------|---------|
| `SERVER_URL` | Public URL of the instance | `http://localhost:3000` |
| `APP_SECRET` | Application secret key | (generated) |
| `STORAGE_TYPE` | Storage backend (`local`, `s3`) | `local` |
| `PG_DATABASE_PASSWORD` | PostgreSQL password | `postgres` |

## Optional Integrations

The compose includes commented-out configuration for:
- Google OAuth (Calendar, Gmail, Auth)
- Microsoft OAuth (Calendar, Outlook, Auth)
- SMTP email settings

## Requirements

- Docker & Docker Compose
- PostgreSQL 16
- Redis