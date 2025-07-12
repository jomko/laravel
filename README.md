# Local Development Guide

This project is a Laravel API backend with a Vue 3 single-page application frontend. It does **not** use Blade templates, server-side rendering (SSR), or Vite SSR. Backend and frontend are developed and deployed separately.

## ✅ Quick Start with DDEV

[DDEV](https://ddev.readthedocs.io/) provides Docker containers for local development.

```bash
# Copy environment files
cp .env.ddev .env
cp front/.env.ddev front/.env

# Start services and install dependencies
ddev start
ddev composer install
ddev artisan key:generate
ddev artisan migrate --seed
```

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

Inside the `front/` directory:

```bash
ddev npm install
ddev npm run dev
```

Vite will serve the app at [http://morkovka-frontend.ddev.site:5173](http://morkovka-frontend.ddev.site:5173)

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
