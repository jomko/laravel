# Local Development Guide

This project provides a Laravel API with a Vue 3 single page application. The backend and frontend are developed separately and Blade templates, server side rendering (SSR) and Vite SSR are **not** used.

## Backend Setup

```bash
composer install
cp .env.example .env
```

Edit the `.env` file and configure the following settings:

- `APP_URL=http://localhost:8000`
- Database connection using MySQL or MariaDB:
  ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=laravel
  DB_USERNAME=root
  DB_PASSWORD=
  ```
- Update `SANCTUM_STATEFUL_DOMAINS` to include the domain running the frontend (for example `localhost:5173`).
- If using cookies with Sanctum, set `supports_credentials` to `true` in `config/cors.php`.

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

The docs will be available at [http://localhost:8000/api/docs](http://localhost:8000/api/docs).

## Frontend Setup

```bash
npm install
```

Vite reads environment variables from `.env`. You can set values such as `VITE_APP_NAME` to make them available in the frontend code. Start the development server on port **5173**:

```bash
npm run dev
```

## CORS and CSRF Notes

When the frontend runs on a different port or domain, ensure that CORS and CSRF settings allow requests from that origin. Confirm that `SANCTUM_STATEFUL_DOMAINS` lists the frontend domain and that CORS settings in `config/cors.php` permit it. Otherwise you may encounter CORS or CSRF errors when authenticating or making API requests.

