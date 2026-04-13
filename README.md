# KIAA Summer School 2026 Website

## Prerequisites

- Docker
- Nginx (on the host machine)
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

## 2. Build Docker Image

`NEXT_PUBLIC_*` variables are baked into the client bundle at build time, so they must be passed as build args:

```bash
source .env

docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY \
  -t kiaa-summer-school .
```

## 3. Run Container

Mount the `.env` file to inject server-side secrets at runtime:

```bash
docker run -d \
  --name kiaa-summer-school \
  --restart unless-stopped \
  --env-file .env \
  -p 127.0.0.1:3000:3000 \
  kiaa-summer-school
```

Verify it's running:

```bash
docker ps
curl -I http://127.0.0.1:3000
```

## 4. Configure Nginx Reverse Proxy

Create `/etc/nginx/sites-available/kiaa-summer-school`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate     /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (for Next.js HMR in dev; harmless in prod)
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site and reload:

```bash
sudo ln -sf /etc/nginx/sites-available/kiaa-summer-school /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5. HTTPS with Let's Encrypt (Optional)

If you haven't set up SSL yet:

```bash
sudo apt install certbot python3-certbot-nginx   # Debian/Ubuntu
sudo certbot --nginx -d your-domain.com
```

Certbot will automatically update the Nginx config and set up auto-renewal.

## Common Operations

**View logs:**

```bash
docker logs -f kiaa-summer-school
```

**Restart after updating `.env`:**

```bash
docker restart kiaa-summer-school
```

**Rebuild and redeploy:**

```bash
source .env
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY \
  -t kiaa-summer-school .

docker stop kiaa-summer-school && docker rm kiaa-summer-school

docker run -d \
  --name kiaa-summer-school \
  --restart unless-stopped \
  --env-file .env \
  -p 127.0.0.1:3000:3000 \
  kiaa-summer-school
```

**Access admin console:**

Open `https://your-domain.com/console` and log in with the credentials from `.env`.
