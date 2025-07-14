<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class ExampleController extends Controller
{
    #[OA\Get(
        path: '/api/v1/example',
        summary: 'Example endpoint',
        tags: ['Example'],
        responses: [new OA\Response(
            response: 200,
            description: 'Successful response',
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'message', type: 'string', example: 'Example response'),
                ]
            )
        )]
    )]
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'message' => 'Example response',
        ]);
    }
}
