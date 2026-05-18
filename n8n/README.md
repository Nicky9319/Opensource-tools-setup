# n8n

Workflow automation platform for connecting apps and automating tasks.

## Quick Start

```bash
docker compose up -d
```

## Access

- URL: `http://localhost:5678`
- Default credentials: `admin / admin123`

**Change the default password before exposing to production.**

## Services

| Service | Port | Description |
|---------|------|-------------|
| n8n | 5678 | Workflow automation engine |

## Features

- Visual workflow editor
- MCP (Model Context Protocol) support enabled
- SQLite database for persistence
- Timezone: Asia/Kolkata

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `N8N_HOST` | Host binding | `localhost` |
| `N8N_PORT` | Port | `5678` |
| `N8N_BASIC_AUTH_USER` | Admin username | `admin` |
| `N8N_BASIC_AUTH_PASSWORD` | Admin password | `admin123` |
| `WEBHOOK_URL` | Public webhook URL | `http://localhost:5678` |
| `GENERIC_TIMEZONE` | Timezone | `Asia/Kolkata` |

## Persistence

Data stored in `n8n_data` volume at `/home/node/.n8n/`