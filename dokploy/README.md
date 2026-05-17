# Dokploy

Self-hosted deployment platform for Docker applications.

## Services

| Service | Port | Description |
|---------|------|-------------|
| Dokploy | 3000, 80, 443 | Main application |
| PostgreSQL | 5432 | Database (internal) |

## Quick Start

```bash
docker compose up -d
```

## Configuration

The instance runs with default credentials for local development:
- Database: `dokploy:dokploy@postgres:5432/dokploy`
- PostgreSQL user/password: `dokploy / dokploy`

## Requirements

- Docker & Docker Compose
- Access to `/var/run/docker.sock` for container management