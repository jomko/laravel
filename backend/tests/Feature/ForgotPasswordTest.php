<?php

namespace Tests\Feature;

use App\Models\User;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;

use Tests\TestCase;

class ForgotPasswordTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Ensure /api/forgot-password sends a reset link for existing users.
     */
    public function test_forgot_password_sends_reset_link_to_existing_user(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $response = $this->postJson('/api/forgot-password', [
            'email' => $user->email,
        ]);

        $response->assertStatus(200);

        Notification::assertSentTo($user, ResetPassword::class);
    }


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
