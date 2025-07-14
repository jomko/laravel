<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ApiExampleTest extends TestCase
{
    /**
     * Ensure the example API endpoint returns the expected JSON response.
     */
    public function test_example_api_endpoint_returns_json(): void
    {
        Route::get('/api/example', function () {
            return ['message' => 'Hello, API'];
        });

        $response = $this->getJson('/api/example');

        $response->assertOk()
                 ->assertExactJson(['message' => 'Hello, API']);
    }
}
