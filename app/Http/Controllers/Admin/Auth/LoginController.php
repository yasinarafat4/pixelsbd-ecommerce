<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class LoginController extends Controller
{
    // use RecaptchaTrait;

    public function __construct()
    {
        $this->middleware('guest:admin', ['except' => ['logout']]);
    }

    public function index()
    {
        return Inertia::render('Admin/Auth/AdminLogin', [
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::ADMIN);
    }

    public function logout(): RedirectResponse
    {
        auth()->guard('admin')->logout();
        session()->regenerateToken();
        session()->flash('success', translate('logged out successfully'));
        return redirect('admin/login');
    }
}
