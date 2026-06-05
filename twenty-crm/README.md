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

1. Copy the example environment file and edit with your values:

```bash
cp .env.example .env
```

2. Generate a secure `APP_SECRET`:

```bash
openssl rand -base64 32
```

3. Start the stack:

```bash
docker compose up -d
```

4. Open Twenty CRM at `http://localhost:3000` and complete the initial workspace setup.

## Configuration

Key environment variables (see `.env.example`):

| Variable | Description | Default |
|----------|-------------|---------|
| `TAG` | Docker image tag | `latest` |
| `SERVER_URL` | Public URL of the instance | `http://localhost:3000` |
| `APP_SECRET` | Application secret key | (required) |
| `PG_DATABASE_USER` | PostgreSQL username | `postgres` |
| `PG_DATABASE_PASSWORD` | PostgreSQL password | (required) |
| `PG_DATABASE_HOST` | PostgreSQL host | `db` |
| `PG_DATABASE_PORT` | PostgreSQL port | `5432` |
| `PG_DATABASE_NAME` | PostgreSQL database name | `default` |
| `REDIS_URL` | Redis connection URL | `redis://redis:6379` |
| `STORAGE_TYPE` | Storage backend (`local`, `s3`) | `local` |
| `TWENTY_API_KEY` | API key for MCP server access | (required for MCP) |
| `TWENTY_BASE_URL` | Base URL for MCP server API calls | `http://localhost:3000` |

## MCP Server (AI Assistant Access)

The `twenty-crm-mcp-server/` directory provides a [Model Context Protocol](https://modelcontextprotocol.io/) server that lets AI assistants (Cursor, Claude Desktop, etc.) interact with your Twenty CRM data using natural language.

### Prerequisites

- Twenty CRM running (see Quick Start above)
- Node.js 18 or higher
- An MCP-compatible client (Cursor, Claude Desktop, etc.)

### Setup

1. **Create an API key** in Twenty CRM:
   - Open your workspace at `http://localhost:3000`
   - Go to **Settings → API & Webhooks** (under Developers)
   - Generate a new API key

2. **Add MCP credentials** to your `.env` file:

```bash
TWENTY_API_KEY=your_api_key_here
TWENTY_BASE_URL=http://localhost:3000
```

3. **Install MCP server dependencies**:

```bash
cd twenty-crm-mcp-server
npm install
```

4. **Configure your MCP client**. Example for Cursor (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "twenty-crm": {
      "command": "node",
      "args": ["/absolute/path/to/twenty-crm/twenty-crm-mcp-server/index.js"],
      "env": {
        "TWENTY_API_KEY": "your_api_key_here",
        "TWENTY_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

Replace `/absolute/path/to/twenty-crm` with the actual path on your machine. Use the same `TWENTY_API_KEY` and `TWENTY_BASE_URL` values from your `.env` file.

5. **Restart your MCP client** to load the server.

### What the MCP server can do

- Create, read, update, and delete people, companies, tasks, and notes
- Search records across object types
- Discover schema and custom fields dynamically

See `twenty-crm-mcp-server/README.md` for the full API reference and usage examples.

## Optional Integrations

The compose file includes commented-out configuration for:
- Google OAuth (Calendar, Gmail, Auth)
- Microsoft OAuth (Calendar, Outlook, Auth)
- SMTP email settings

## Requirements

- Docker & Docker Compose
- Node.js 18+ (for MCP server only)
- PostgreSQL 16
- Redis
