# KIAA Summer School 2026 Website

## Prerequisites

- Docker & Docker Compose
- A configured Supabase project

## 1. Prepare Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```dotenv
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxx

# Admin console
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=generate-with-openssl-rand-hex-32
```

Generate a session secret:

```bash
openssl rand -hex 32
```

## 2. Build and Start

```bash
docker compose up -d --build
```

This will:
1. Build the Next.js application image (with `NEXT_PUBLIC_*` as build args)
2. Start the Next.js container (`app`, port 3000, internal only)
3. Start the Nginx container (port 80, exposed to host)

Verify:

```bash
docker compose ps
curl -I http://127.0.0.1
```

Then visit `http://<your-server-ip>` in a browser.

## Project Structure

```
docker-compose.yml          # Compose orchestration
Dockerfile                  # Next.js multi-stage build
nginx/default.conf          # Nginx reverse proxy config
.env                        # Environment variables (not committed)
```

### How Networking Works

```
Browser → :80 → [nginx container] → http://app:3000 → [Next.js container]
```

Both containers are on the same Docker Compose network. Nginx uses the container name `app` (not `127.0.0.1`) to reach Next.js.

## Common Operations

**View logs:**

```bash
docker compose logs -f          # all services
docker compose logs -f app      # Next.js only
docker compose logs -f nginx    # Nginx only
```

**Restart after updating `.env`:**

```bash
docker compose up -d --build    # rebuild with new env and restart
```

**Stop all services:**

```bash
docker compose down
```

**Access admin console:**

Open `http://<your-server-ip>/console` and log in with the credentials from `.env`.
