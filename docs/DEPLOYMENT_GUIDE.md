# FerixBuilder Deployment Guide

## Pre-Deployment Steps

### 1. Create Local .env File
Create a `.env` file in the project root with the database URL:
```bash
DATABASE_URL=postgresql://neondb_owner:npg_njHFmJ1SPZC6@ep-calm-dust-a5133fjk-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. Run Prisma Migration Locally
```bash
cd c:\Users\Administrator\FerixBuilder
npx prisma migrate dev --name init_new_schema
npx prisma generate
```

### 3. Build Backend Locally
```bash
npm run build
```

### 4. Build Frontend Locally
```bash
cd Web/frontend
npm install --legacy-peer-deps
npm run build
```

### 5. Build Admin Panel Locally
```bash
cd ../admin
npm install --legacy-peer-deps
npm run build
```

## Server Deployment Commands

### SSH into Server
```bash
ssh ubuntu@98.80.246.5
```

### Navigate to Project Directory
```bash
cd ~/FerixBuilder
```

### Pull Latest Code
```bash
git pull origin main
```

### Install Dependencies
```bash
npm install --legacy-peer-deps
cd Web/frontend && npm install --legacy-peer-deps
cd ../admin && npm install --legacy-peer-deps
cd ../..
```

### Run Prisma Migration on Server
```bash
npx prisma migrate deploy
npx prisma generate
```

### Build Backend
```bash
npm run build
```

### Build Frontend
```bash
cd Web/frontend
npm run build
```

### Build Admin Panel
```bash
cd ../admin
npm run build
```

### Stop Existing PM2 Services
```bash
pm2 stop ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin
pm2 delete ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin
```

### Start Backend
```bash
cd ~/FerixBuilder
pm2 start dist/index.js --name ferixbuilder-backend --update-env
```

### Start Frontend
```bash
pm2 start serve --name ferixbuilder-frontend -- -s Web/frontend/dist -l 3005
```

### Start Admin Panel
```bash
pm2 start serve --name ferixbuilder-admin -- -s Web/admin/dist -l 3006
```

### Save PM2 Configuration
```bash
pm2 save
```

### Reload Nginx
```bash
sudo systemctl reload nginx
```

### Verify Services
```bash
pm2 list
pm2 logs ferixbuilder-backend --lines 50
pm2 logs ferixbuilder-frontend --lines 50
pm2 logs ferixbuilder-admin --lines 50
```

## Environment Variables (Already Set on Server)

### Backend (.env)
```bash
PORT=5004
NODE_ENV=production
DATABASE_URL=[YOUR_DATABASE_URL]
JWT_SECRET=[YOUR_JWT_SECRET]
CLOUDINARY_CLOUD_NAME=[YOUR_CLOUDINARY_CLOUD_NAME]
CLOUDINARY_API_KEY=[YOUR_CLOUDINARY_API_KEY]
CLOUDINARY_API_SECRET=[YOUR_CLOUDINARY_API_SECRET]
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

## Troubleshooting

### Check Backend Logs
```bash
pm2 logs ferixbuilder-backend
```

### Check Frontend Logs
```bash
pm2 logs ferixbuilder-frontend
```

### Check Admin Logs
```bash
pm2 logs ferixbuilder-admin
```

### Restart All Services
```bash
pm2 restart ferixbuilder-backend ferixbuilder-frontend ferixbuilder-admin --update-env
```

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

## Verification

After deployment, verify:
1. Frontend: https://build.ferixas.com
2. Admin Panel: https://buildportal.ferixas.com
3. Backend API: https://buildapi.ferixas.com

## New Backend Endpoints

### Project Requests
- `projectRequests.create` - Create new project request
- `projectRequests.getMyRequests` - Get current customer's requests
- `projectRequests.getById` - Get specific request
- `projectRequests.update` - Update request (DRAFT only)
- `projectRequests.submit` - Submit request (DRAFT → SUBMITTED)

### Projects
- `projects.createFromRequest` - Create project from request (admin)
- `projects.getMyProjects` - Get current customer's projects
- `projects.getAll` - Get all projects (admin)
- `projects.getById` - Get specific project
- `projects.update` - Update project
- `projects.delete` - Delete project (admin)

### Scopes
- `scopes.create` - Create scope for project (admin)
- `scopes.getByProjectId` - Get scope by project ID
- `scopes.update` - Update scope (admin)
- `scopes.addFeature` - Add feature to scope (admin)
- `scopes.addExclusion` - Add exclusion to scope (admin)
- `scopes.approve` - Approve scope (customer)
- `scopes.sendToCustomer` - Send scope to customer (admin)

### Billing
- `billing.createInvoice` - Create invoice (admin)
- `billing.getMyInvoices` - Get current customer's invoices
- `billing.getAllInvoices` - Get all invoices (admin)
- `billing.getInvoiceById` - Get specific invoice
- `billing.updateInvoice` - Update invoice (admin)
- `billing.createPayment` - Create payment
- `billing.getMyPayments` - Get current customer's payments
- `billing.getAllPayments` - Get all payments (admin)
- `billing.updatePaymentStatus` - Update payment status (admin)
