# Chatwoot Self-Hosted Setup

## Prerequisites

* Docker
* Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

## Clone Repository

```bash
git clone <repository-url>
cd <repository-name>
```

## Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Generate a secret key:

```bash
openssl rand -hex 64
```

Update the following values in `.env`:

```env
SECRET_KEY_BASE=<generated-secret>
POSTGRES_PASSWORD=<secure-password>
REDIS_PASSWORD=<secure-password>
```

## Start Database Services

```bash
docker compose up -d postgres redis
```

Verify:

```bash
docker compose ps
```

## Initialize Chatwoot Database

```bash
docker compose run --rm rails bundle exec rails db:chatwoot_prepare
```

This command creates the database and runs all migrations.

## Start Chatwoot

```bash
docker compose up -d
```

Verify containers:

```bash
docker compose ps
```

Expected services:

* rails
* sidekiq
* postgres
* redis

## View Logs

Rails:

```bash
docker compose logs -f rails
```

Sidekiq:

```bash
docker compose logs -f sidekiq
```

## Access Chatwoot

Open:

```text
http://localhost:3000
```

If running on a remote server:

```text
http://SERVER_IP:3000
```

## Stop Services

```bash
docker compose down
```

## Remove All Data

Warning: this removes PostgreSQL, Redis, and uploaded files.

```bash
docker compose down -v
```

## Common Issues

### Sidekiq Restarting

Verify:

```env
POSTGRES_PASSWORD=<same value as docker-compose postgres service>
```

and

```env
REDIS_PASSWORD=<same value used by redis container>
```

### Database Migration Errors

Re-run:

```bash
docker compose run --rm rails bundle exec rails db:chatwoot_prepare
```

### Check Container Status

```bash
docker compose ps
```
