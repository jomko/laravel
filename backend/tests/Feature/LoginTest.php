<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Ensure /api/login authenticates with valid credentials.
     */
    public function test_login_endpoint_authenticates_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('secret'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'secret',
        ]);

        $response->assertOk()
                 ->assertJsonStructure([
                     'token',
                     'user' => ['id', 'email'],
                 ]);
    }
}
