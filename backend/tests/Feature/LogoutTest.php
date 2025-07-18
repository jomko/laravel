<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_logout_endpoint_destroys_session(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('secret'),
        ]);

        $this->get('/sanctum/csrf-cookie');

        $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'secret',
        ], ['Referer' => 'http://localhost:5173']);

        $this->assertAuthenticated();

        $response = $this->postJson('/api/logout', [], ['Referer' => 'http://localhost:5173']);

        $response->assertOk();

        $this->assertGuest('web');
    }
}
