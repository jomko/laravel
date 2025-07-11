<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $e)
    {
        if ($request instanceof Request && $request->expectsJson()) {
            $status = $this->isHttpException($e) ? $e->getStatusCode() : 500;

            return response()->json([
                'message' => $e->getMessage(),
            ], $status);
        }

        return parent::render($request, $e);
    }
}
