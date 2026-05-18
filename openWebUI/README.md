# Open WebUI

Web interface for interacting with LLMs. Provides chat UI with authentication and community features.

## Quick Start

```bash
docker compose up -d
```

## Access

- URL: `http://localhost:3000`
- Authentication: Enabled (signup allowed by default)

## Services

| Service | Port | Description |
|---------|------|-------------|
| Open WebUI | 3000 | Web UI (internal: 8080) |

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `WEBUI_SECRET_KEY` | Session secret key | `abcdefghijklmnopqrstuvwxyz` |
| `WEBUI_AUTH` | Enable authentication | `true` |
| `ENABLE_SIGNUP` | Allow new user registration | `true` |
| `DEFAULT_USER_ROLE` | Default role for new users | `user` |
| `ENABLE_COMMUNITY_SHARING` | Share workflows | `false` |
| `ENABLE_MESSAGE_RATING` | Rate messages | `false` |

## Data Persistence

All data stored in `open-webui` volume at `/app/backend/data`

## Host Access

Configured to access host Docker daemon via `host.docker.internal:host-gateway`