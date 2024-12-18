<?php

namespace App\Http\Controllers\DeliveryBoy\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeliveryBoy\LoginRequest;
use App\Models\DeliveryBoy;
use App\Models\Shop;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class LoginController extends Controller
{
    // use RecaptchaTrait;

    public function __construct()
    {
        $this->middleware('guest:delivery_boy', ['except' => ['logout']]);
    }

    public function index()
    {
        return Inertia::render('DeliveryBoy/Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::DELIVERY_BOY);
    }

    public function logout(): RedirectResponse
    {
        auth()->guard('delivery_boy')->logout();
        session()->regenerateToken();
        session()->flash('success', translate('logged out successfully'));
        return redirect()->route('delivery_boy.login');
    }
}
