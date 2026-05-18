# cAdvisor

Google's container monitoring tool. Provides resource usage and performance characteristics of running containers.

## Quick Start

```bash
docker compose up -d
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| cAdvisor | 8080 | Container metrics UI and API |

## Access

Web UI: `http://localhost:8080`

## Mounts

cAdvisor monitors the following host paths (read-only):
- `/` - Root filesystem
- `/var/run` - Docker runtime sockets
- `/sys` - System cgroup metrics
- `/var/lib/docker` - Docker storage
- `/dev/disk` - Disk I/O metrics

## Requirements

- Docker daemon access
- Privileged mode for full container metrics