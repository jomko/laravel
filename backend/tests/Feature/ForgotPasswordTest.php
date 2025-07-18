<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Auth\Notifications\ResetPassword;
use Tests\TestCase;

class ForgotPasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_endpoint_returns_success_for_valid_email(): void
    {
        $user = User::factory()->create();

        config(['app.key' => 'base64:'.base64_encode(random_bytes(32))]);

        ResetPassword::createUrlUsing(fn ($user, string $token) => 'http://example.com/reset/'.$token);

        $response = $this->postJson('/api/forgot-password', [
            'email' => $user->email,
        ]);

        $response->assertOk()->assertJsonStructure(['status']);
    }
}
