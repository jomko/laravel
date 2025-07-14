<?php

return [
    'default' => 'default',

    'documentations' => [
        'default' => [
            'api' => [
                'title' => env('L5_SWAGGER_API_TITLE', 'Morkovka 2.0'),
                'version' => env('L5_SWAGGER_API_VERSION', 'v1'),
            ],

            'routes' => [
                // Route used to serve the generated documentation.
                'api' => 'api/docs.json',
                // Route that displays Swagger UI.
                'docs' => 'api/docs',
                'middleware' => [
                    'api' => [],
                    'docs' => [],
                    'asset' => [],
                ],
            ],

            'paths' => [
                'docs' => storage_path('api-docs'),
                'annotations' => [
                    base_path('app'),
                    base_path('routes'),
                ],
            ],
        ],
    ],
];
