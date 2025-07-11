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

## API documentation

Swagger UI is available at `/api/docs` after running the Swagger generator. Endpoints can be documented using PHP attributes from `swagger-php`. Example:

```php
use OpenApi\Attributes as OA;

#[OA\Get(path: '/api/v1/example', summary: 'Example endpoint')]
public function __invoke(): JsonResponse
{
    return response()->json(['message' => 'Example response']);
}
```

Run `php artisan l5-swagger:generate` to regenerate the OpenAPI spec.
