<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\ExampleController;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello from API v1']);
});

Route::get('/example', ExampleController::class);
