<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsDeliveryBoyActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!addon_is_activated('delivery_boy')) {
            flash_error(trans("Delivery boy addon not activate!"));
            return redirect()->route('home');
        }
        return $next($request);
    }
}
