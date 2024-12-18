<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsSellerShopVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('seller')->check() && auth('seller')->user()->shop->verification_status) {

            $redirect_to = "seller_verification";

            flash_error(trans("You Shop is not verified Yet. Please Verify Shop First!!!"));
            return redirect()->route($redirect_to);
        }
        return $next($request);
    }
}
