<?php

Route::get('/', function () {
    return <<<HTML
        <html style="background:#111;color:#eee;font-family:sans-serif;text-align:center;padding:5rem">
            <h1>🥕 Морква 2.0</h1>
            <p>Backend is alive — dev and destroy. <a href="/api/ping" style="color:#8f8;">Ping it</a></p>
        </html>
    HTML;
});