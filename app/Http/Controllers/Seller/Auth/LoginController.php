<?php

namespace App\Http\Controllers\Seller\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\LoginRequest;
use App\Models\Seller;
use App\Models\Shop;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class LoginController extends Controller
{
    // use RecaptchaTrait;

    public function __construct()
    {
        $this->middleware('guest:seller', ['except' => ['logout']]);
    }

    public function index()
    {
        return Inertia::render('Seller/Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::SELLER);
    }

    public function register()
    {
        return Inertia::render('Seller/Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'f_name' => 'required|string|max:255',
            'l_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Seller::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'shop_name' => 'required',
            'address' => 'required',
        ]);

        $seller = Seller::create([
            'f_name' => $request->f_name,
            'l_name' => $request->l_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'country_code' => $request->country_code,
        ]);

        $slug = Str::slug($request->shop_name);
        $same_slug_count = Shop::where('slug', 'LIKE', $slug . '%')->count();
        $slug_suffix = $same_slug_count ? '-' . $same_slug_count + 1 : '';
        $slug .= $slug_suffix;

        Shop::create([
            'seller_id' => $seller->id,
            'name' => $request->shop_name,
            'slug' => $slug,
            'address' => $request->address,
        ]);

        event(new Registered($seller));
        Auth::guard('seller')->login($seller);
        return redirect(RouteServiceProvider::SELLER);
    }

    public function logout(): RedirectResponse
    {
        auth()->guard('seller')->logout();
        session()->regenerateToken();
        session()->flash('success', translate('logged out successfully'));
        return redirect('seller/login');
    }
}
