# FerixBuilder Complete Server Handoff Document

## 🖥️ Server Details

| Item | Value |
|------|-------|
| Server IP | 98.80.246.5 (Public) / 172.31.46.187 (Private) |
| SSH User | ubuntu |
| Project Root | /home/ubuntu/FerixBuilder |
| Domain | ferixas.com |

## 📁 Project Structure

```
/home/ubuntu/FerixBuilder/
├── Backend/              # Backend API (Node.js + Express)
│   └── .env              # Environment variables
├── Web/
│   ├── frontend/         # Customer frontend (Vite + React)
│   │   └── .env.production
│   └── admin/            # Admin panel (Vite + React)
│       └── .env.production
├── dist/                 # Built backend
├── package.json          # Root package.json (monorepo)
└── vite.config.ts        # Vite configuration
```

## 🌐 Domains

| Domain | Purpose | Port |
|--------|---------|------|
| build.ferixas.com | Customer Frontend | 3005 |
| buildportal.ferixas.com | Admin Panel | 3006 |
| buildapi.ferixas.com | Backend API | 5004 |

## 🔐 Environment Variables

### Backend (.env)

```bash
PORT=5004
NODE_ENV=production

# Database
DATABASE_URL=[YOUR_DATABASE_URL]

# Security
JWT_SECRET=[YOUR_JWT_SECRET]

# Cloudinary
CLOUDINARY_CLOUD_NAME=[YOUR_CLOUDINARY_CLOUD_NAME]
CLOUDINARY_API_KEY=[YOUR_CLOUDINARY_API_KEY]
CLOUDINARY_API_SECRET=[YOUR_CLOUDINARY_API_SECRET]

# Resend (Email)
RESEND_API_KEY=[YOUR_RESEND_API_KEY]
RESEND_FROM_EMAIL=noreply@ferixas.com
```

### Frontend (.env.production)

```bash
NEXT_PUBLIC_API_URL=https://buildapi.ferixas.com
NEXT_PUBLIC_APP_URL=https://build.ferixas.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=gqhwza90
```

### Admin Panel (.env.production)

```bash
NEXT_PUBLIC_API_URL=https://buildapi.ferixas.com
NEXT_PUBLIC_ADMIN_URL=https://buildportal.ferixas.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=gqhwza90
```

## 🚀 PM2 Services

| Service Name | Script | Port | Status |
|--------------|--------|------|--------|
| ferixbuilder-backend | dist/index.js | 5004 | ✅ Running |
| ferixbuilder-frontend | serve -s Web/frontend/dist -l 3005 | 3005 | ✅ Running |
| ferixbuilder-admin | serve -s Web/admin/dist -l 3006 | 3006 | ✅ Running |

### PM2 Commands

```bash
# View all services
pm2 list

# View logs
pm2 logs ferixbuilder-backend
pm2 logs ferixbuilder-frontend
pm2 logs ferixbuilder-admin

# Restart services
pm2 restart ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin --update-env

# Stop services
pm2 stop ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin

# Delete services
pm2 delete ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin
```

## 🌐 Nginx Configuration

File: /etc/nginx/sites-available/ferixbuilder

```nginx
# FerixBuilder Frontend
server {
    listen 80;
    listen 443 ssl;
    server_name build.ferixas.com;
    ssl_certificate /etc/nginx/ssl/ferixas.crt;
    ssl_certificate_key /etc/nginx/ssl/ferixas.key;
    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# FerixBuilder Admin
server {
    listen 80;
    listen 443 ssl;
    server_name buildportal.ferixas.com;
    ssl_certificate /etc/nginx/ssl/ferixas.crt;
    ssl_certificate_key /etc/nginx/ssl/ferixas.key;
    location / {
        proxy_pass http://localhost:3006;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# FerixBuilder Backend API
server {
    listen 80;
    listen 443 ssl;
    server_name buildapi.ferixas.com;
    ssl_certificate /etc/nginx/ssl/ferixas.crt;
    ssl_certificate_key /etc/nginx/ssl/ferixas.key;
    location / {
        proxy_pass http://localhost:5004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Edit configuration
sudo nano /etc/nginx/sites-available/ferixbuilder

# Enable site
sudo ln -sf /etc/nginx/sites-available/ferixbuilder /etc/nginx/sites-enabled/
```

## 🔧 Build & Deployment Commands

### Full Rebuild & Deploy

```bash
cd ~/FerixBuilder

# 1. Pull latest code
git pull origin main

# 2. Build backend (from root)
npm run build

# 3. Build frontend
cd Web/frontend && npm install --legacy-peer-deps && npm run build

# 4. Build admin
cd ../admin && npm install --legacy-peer-deps && npm run build

# 5. Restart services
cd ../.. && pm2 restart ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin --update-env

# 6. Reload Nginx
sudo systemctl reload nginx
```

### Start Services Fresh

```bash
# Stop and delete old services
pm2 stop ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin
pm2 delete ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin

# Start backend
pm2 start dist/index.js --name ferixbuilder-backend --update-env

# Start frontend
pm2 start serve --name ferixbuilder-frontend -- -s Web/frontend/dist -l 3005

# Start admin
pm2 start serve --name ferixbuilder-admin -- -s Web/admin/dist -l 3006
```

## 📦 Dependencies & Credentials

| Service | Credential | Source |
|---------|------------|--------|
| Database | [YOUR_DATABASE_URL] | Neon |
| Cloudinary | [YOUR_CLOUDINARY_CLOUD_NAME] | Existing Ferixas account |
| Resend | [YOUR_RESEND_API_KEY] | Existing Ferixas account |
| JWT Secret | [YOUR_JWT_SECRET] | New for this project |

## ✅ Current Status

| Item | Status |
|------|--------|
| Backend | ✅ Running on port 5004 |
| Frontend | ✅ Running on port 3005 |
| Admin | ✅ Running on port 3006 |
| Nginx | ✅ Configured |
| Environment Variables | ✅ Set up |

## 📋 For the AI Developer

Please follow these rules:

1. Never push commands directly to the server — provide commands for me to run.
2. All environment variables are already set — do not ask me to create new ones.
3. Test changes locally before suggesting deployment.
4. Provide clear, single-command solutions that I can copy and paste.

The AI should work on the code and provide me with commands to deploy, not deploy directly.
