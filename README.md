# Local Development Guide

This project provides a Laravel API with a Vue 3 single page application. The backend and frontend are developed separately and Blade templates, server side rendering (SSR) and Vite SSR are **not** used.

## DDEV Setup

[DDEV](https://ddev.readthedocs.io/) provides Docker containers for local development. After installing DDEV run the environment from the project root:

```bash
# copy environment files
cp .env.ddev .env
cp frontend/.env.ddev frontend/.env

# start containers and install dependencies
ddev start
ddev composer install
ddev artisan key:generate
ddev artisan migrate --seed
```

After starting the containers two services are available:

- API: [http://morkovka.ddev.site:8000](http://morkovka.ddev.site:8000)
- Frontend: [http://morkovka-frontend.ddev.site:5173](http://morkovka-frontend.ddev.site:5173)

Use `ddev npm install` and `ddev npm run dev` to run the frontend inside the container.

## Backend Setup

```bash
composer install
```

Copy `.env.ddev` to `.env` if you are not using `ddev start`.

### Database (PostgreSQL)

DDEV provides PostgreSQL 15 with credentials defined in `.env.ddev`:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=morkovka
DB_USERNAME=db
DB_PASSWORD=db
```

After configuring the environment run:

```bash
php artisan key:generate
php artisan migrate --seed
```

Start the development server on port **8000**:

```bash
php artisan serve --port=8000
```

### Queue Worker

Run the queue worker in a separate terminal:

```bash
php artisan queue:listen
```

Queue and application logs are written to `storage/logs/laravel.log`.

### API Documentation

Generate and view the Swagger documentation:

```bash
php artisan l5-swagger:generate
```

The docs will be available at [http://morkovka.ddev.site:8000/api/docs](http://morkovka.ddev.site:8000/api/docs).

## Frontend Setup

```bash
ddev npm install
```

Vite reads environment variables from `frontend/.env`. Start the development server on port **5173** in the frontend container:

```bash
ddev npm run dev
```

## CORS and CSRF Notes

When the frontend runs on a different port or domain, ensure that CORS and CSRF settings allow requests from that origin. Confirm that `SANCTUM_STATEFUL_DOMAINS` lists the frontend domain and that CORS settings in `config/cors.php` permit it. Otherwise you may encounter CORS or CSRF errors when authenticating or making API requests.

