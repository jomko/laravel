<?php

use Illuminate\Support\Facades\Route;


Route::get('/ping', function () {
    return ['message' => 'pong'];

Route::get('/', function () {
    return ['message' => 'Laravel'];

});
