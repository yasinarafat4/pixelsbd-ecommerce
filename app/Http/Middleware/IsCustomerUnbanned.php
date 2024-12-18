<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsCustomerUnbanned
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('customer')->check() && auth('customer')->user()->banned) {

            $redirect_to = "login";

            auth('customer')->logout();

            flash_error(trans("You are banned"));
            return redirect()->route($redirect_to);
        }
        return $next($request);
    }
}
