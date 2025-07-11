<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ExampleController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'message' => 'Example response',
        ]);
    }
}
