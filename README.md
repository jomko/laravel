# Local Development Guide

This project is a monorepo containing a Laravel API and a Vue 3 SPA. It does **not** use Blade templates, server-side rendering (SSR), or Vite SSR.

## 📁 Project Structure

- `backend/` – Laravel API
- `frontend/` – Vue 3 SPA served by Vite
- Docker/DDEV for local development

## ✅ Quick Start with DDEV

[DDEV](https://ddev.readthedocs.io/) provides Docker containers for local development.

```bash
# Copy environment files
cp backend/.env.ddev backend/.env
cp frontend/.env.ddev frontend/.env

# Start services and install dependencies
ddev start
ddev composer install --working-dir backend
ddev exec php backend/artisan key:generate
ddev exec php backend/artisan migrate --seed
```

### Selecting an Environment

Environment templates exist for staging and production. To use them, copy the
appropriate file to `.env` before starting services:

```bash
# Staging
cp backend/.env.staging backend/.env
cp frontend/.env.staging frontend/.env

# Production
cp backend/.env.production backend/.env
cp frontend/.env.production frontend/.env
```

- If you modify `.env` later, run `ddev restart` to apply the changes.

---

## 🔗 Available Services

- **API**: [https://morkovka.ddev.site:8443](https://morkovka.ddev.site:8443)
- **Frontend (Vite)**: [http://morkovka-frontend.ddev.site:5173](http://morkovka-frontend.ddev.site:5173)

---

## 🐘 Database (PostgreSQL)

PostgreSQL 15 is available via DDEV. Configuration is defined in `.env.ddev`:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=morkovka
DB_USERNAME=db
DB_PASSWORD=db
```

After running `ddev artisan migrate --seed`, the database is ready. You can also reset it with:

```bash
ddev artisan migrate:fresh --seed
```


---

## 📘 API Documentation (Swagger)

```bash
ddev artisan l5-swagger:generate
```

Docs will be available at:  
[https://morkovka.ddev.site:8443/api/docs](https://morkovka.ddev.site:8443/api/docs)

---

## 🎨 Frontend Setup

Inside the `frontend/` directory:

```bash
npm install
npm run dev
```


Vite will serve the app at [http://localhost:5173](http://localhost:5173)
If the port is busy, it will pick the next available one (e.g. 5174)
---

## 🔒 CORS and CSRF Notes

To support cross-domain authentication:

- Make sure `SANCTUM_STATEFUL_DOMAINS` includes the frontend domain (e.g., `morkovka-frontend.ddev.site:5173`)
- CORS settings in `config/cors.php` must allow the origin

---

## 🧠 Tips

- Use `ddev ssh` to access containers
- If you edit `.env`, run `ddev restart`
- Never commit sensitive files like `.env`, OAuth credentials, or access tokens
