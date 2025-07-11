# Local Development

This project is a Laravel API with a Vue 3 single page application (SPA). Blade templates are not used.

## Backend installation

```bash
composer install
cp .env.example .env
php artisan key:generate
```

## Frontend installation

```bash
npm install
```

## Project structure

- API routes are located in `routes/api`.
- The Vue application lives in `resources/js`.

## Running tests

```bash
composer test
```

## Features

- SPA without Blade templates
- CORS configuration in `config/cors.php`
- Custom JSON exception handler (`App\\Exceptions\\Handler`)
- Authentication via Laravel Sanctum
- Vue 3 frontend built with Vite
