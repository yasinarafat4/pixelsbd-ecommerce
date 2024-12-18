<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Localization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (session()->has('locale')) {
            \App::setLocale(session()->get('locale'));
            config(['app.locale' => session()->get('locale')]);
        } else {
            \App::setLocale('en');
            config(['app.locale' => 'en']);
        }
        return $next($request);
    }
}
