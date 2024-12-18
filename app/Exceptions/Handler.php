<?php

namespace App\Exceptions;

use BadMethodCallException;
use ErrorException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {

        if ($e instanceof Redirectingexception) {
            return redirect()->back();
        }

        // // Handle specific HTTP exceptions
        // if ($e instanceof HttpException) {
        //     $statusCode = $e->getStatusCode();

        //     if ($statusCode === 404) {
        //         return Inertia::render('NotFound')->toResponse($request)->setStatusCode(404);
        //     }

        //     if ($statusCode === 500) {
        //         return Inertia::render('ServerError')->toResponse($request)->setStatusCode(500);
        //     }

        //     // You can add more specific HTTP error handling here if needed, like 403, 401, etc.
        // }

        // if ($e instanceof ErrorException) {
        //     // Redirect to a custom 500 page for general internal server errors
        //     return Inertia::render('ServerError')->toResponse($request)->setStatusCode(500);
        // }

        // if ($e instanceof BadMethodCallException) {
        //     // Redirect to a custom 500 page for general internal server errors
        //     return Inertia::render('ServerError')->toResponse($request)->setStatusCode(500);
        // }

        // // Handle database query exceptions (SQL errors)
        // if ($e instanceof QueryException) {
        //     // Log the exception if needed
        //     \Log::error('Database Query Exception: ' . $e->getMessage());

        //     // Return the custom 500 page for database errors
        //     return Inertia::render('ServerError')->toResponse($request)->setStatusCode(500);
        // }

        // // Handle ModelNotFoundException (when a model is not found in the database)
        // if ($e instanceof ModelNotFoundException) {
        //     return Inertia::render('NotFound')->toResponse($request)->setStatusCode(404);
        // }

        // // Handle authorization errors
        // if ($e instanceof \Illuminate\Auth\Access\AuthorizationException) {
        //     return Inertia::render('Unauthorized')->toResponse($request)->setStatusCode(401);
        // }
        // // Handle authorization errors
        // if ($e instanceof UnauthorizedException) {
        //     return Inertia::render('Unauthorized')->toResponse($request)->setStatusCode(403);
        // }

        // // Handle authorization errors
        // if ($e instanceof UnauthorizedException) {
        //     return Inertia::render('Unauthorized')->toResponse($request)->setStatusCode(401);
        // }


        return parent::render($request, $e);
    }
}
