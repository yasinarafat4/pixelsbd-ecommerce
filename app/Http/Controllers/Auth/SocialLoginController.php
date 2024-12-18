<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $user = Socialite::driver($provider)->user();
        $existingUser = User::where('email', $user->email)->first();
        // dd($user);
        if ($existingUser) {
            Auth::guard('customer')->login($existingUser);
        } else {

            $newuser = User::create([
                'name'          => $user->name,
                'email'         => $user->email,
                'password'      => Hash::make(Str::random(8)),
                'image'         => $user->avatar,
                'email_verified_at' => Carbon::now(),
                'provider_name' => $provider,
                'provider_id'   => $user->id,
                'provider_token' => $user->token
            ]);

            Auth::guard('customer')->login($newuser);
        }
        return redirect()->intended(RouteServiceProvider::HOME);
    }
}
