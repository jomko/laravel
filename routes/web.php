<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\ExampleController;

Route::get('/', function () {
    return view('app');
});

Route::get('/api/v1/example', ExampleController::class);
