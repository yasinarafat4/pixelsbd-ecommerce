<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\OTPVerificationController;
use App\Mail\GuestAccountOpeningMailManager;
use App\Models\Address;
use App\Models\Cart;
use App\Models\User;
use App\Notifications\AppEmailVerificationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $messages = array(
            'name.required' => trans('Name is required'),
            'email_or_phone.required' => $request->register_by == 'email' ? trans('Email is required') : trans('Phone is required'),
            'email_or_phone.email' => trans('Email must be a valid email address'),
            'email_or_phone.numeric' => trans('Phone must be a number.'),
            'email_or_phone.unique' => $request->register_by == 'email' ? trans('The email has already been taken') : trans('The phone has already been taken'),
            'password.required' => trans('Password is required'),
            'password.confirmed' => trans('Password confirmation does not match'),
            'password.min' => trans('Minimum 6 digits required for password')
        );
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'password' => 'required|min:6|confirmed',
            'email_or_phone' => [
                'required',
                Rule::when($request->register_by === 'email', ['email', 'unique:users,email']),
                Rule::when($request->register_by === 'phone', ['numeric', 'unique:users,phone']),
            ],
        ], $messages);

        if ($validator->fails()) {
            return response()->json([
                'result' => false,
                'message' => $validator->errors()->all()
            ]);
        }

        $user = new User();
        $user->name = $request->name;
        if ($request->register_by == 'email') {

            $user->email = $request->email_or_phone;
        }
        if ($request->register_by == 'phone') {
            $user->phone = $request->email_or_phone;
        }
        $user->password = bcrypt($request->password);
        $user->verification_code = rand(100000, 999999);
        $user->save();


        $user->email_verified_at = null;
        if ($user->email != null) {
            if (get_settings('email_verification') != '1') {
                $user->email_verified_at = date('Y-m-d H:m:s');
            }
        }

        if ($user->email_verified_at == null) {
            if ($request->register_by == 'email') {
                try {
                    $user->notify(new AppEmailVerificationNotification());
                } catch (\Exception $e) {
                }
            } else {
                $otpController = new OTPVerificationController();
                $otpController->send_code($user);
            }
        }

        $user->save();
        //create token
        $user->createToken('tokens')->plainTextToken;

        $tempUserId = $request->has('temp_user_id') ? $request->temp_user_id : null;
        return $this->loginSuccess($user, '', $tempUserId);
    }

    public function resendCode()
    {
        $user = auth()->user();
        $user->verification_code = rand(100000, 999999);

        if ($user->email) {
            try {
                /**@disregard */
                $user->notify(new AppEmailVerificationNotification());
            } catch (\Exception $e) {
            }
        } else {
            $otpController = new OTPVerificationController();
            $otpController->send_code($user);
        }
        /**@disregard */
        $user->save();

        return response()->json([
            'result' => true,
            'message' => trans('Verification code is sent again'),
        ], 200);
    }

    public function confirmCode(Request $request)
    {
        $user = auth()->user();

        if ($user->verification_code == $request->verification_code) {
            $user->email_verified_at = date('Y-m-d H:i:s');
            $user->verification_code = null;
            /**@disregard */
            $user->save();
            return response()->json([
                'result' => true,
                'message' => trans('Your account is now verified'),
            ], 200);
        } else {
            return response()->json([
                'result' => false,
                'message' => trans('Code does not match, you can request for resending the code'),
            ], 200);
        }
    }

    public function login(Request $request)
    {
        $messages = array(
            'email.required' => $request->login_by == 'email' ? trans('Email is required') : trans('Phone is required'),
            'email.email' => trans('Email must be a valid email address'),
            'email.numeric' => trans('Phone must be a number.'),
            'password.required' => trans('Password is required'),
        );
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'login_by' => 'required',
            'email' => [
                'required',
                Rule::when($request->login_by === 'email', ['email', 'required']),
                Rule::when($request->login_by === 'phone', ['numeric', 'required']),
            ]
        ], $messages);

        if ($validator->fails()) {
            return response()->json([
                'result' => false,
                'message' => $validator->errors()->all()
            ]);
        }

        $req_email = $request->email;

        $user = User::where(function ($query) use ($req_email) {
            $query->where('email', $req_email)
                ->orWhere('phone', $req_email);
        })->first();


        if ($user != null) {
            if (!$user->banned) {
                if (Hash::check($request->password, $user->password)) {
                    $tempUserId = $request->has('temp_user_id') ? $request->temp_user_id : null;
                    return $this->loginSuccess($user, '', $tempUserId);
                } else {
                    return response()->json(['result' => false, 'message' => trans('Unauthorized'), 'user' => null], 401);
                }
            } else {
                return response()->json(['result' => false, 'message' => trans('User is banned'), 'user' => null], 401);
            }
        } else {
            return response()->json(['result' => false, 'message' => trans('User not found'), 'user' => null], 401);
        }
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {

        $user = request()->user();
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        return response()->json([
            'result' => true,
            'message' => trans('Successfully logged out')
        ]);
    }

    public function socialLogin(Request $request)
    {
        if (!$request->provider) {
            return response()->json([
                'result' => false,
                'message' => trans('User not found'),
                'user' => null
            ]);
        }

        switch ($request->social_provider) {
            case 'facebook':
                $social_user = Socialite::driver('facebook')->fields([
                    'name',
                    'first_name',
                    'last_name',
                    'email'
                ]);
                break;
            case 'google':
                $social_user = Socialite::driver('google')
                    ->scopes(['profile', 'email']);
                break;
            case 'twitter':
                $social_user = Socialite::driver('twitter');
                break;
            case 'apple':
                $social_user = Socialite::driver('sign-in-with-apple')
                    ->scopes(['name', 'email']);
                break;
            default:
                $social_user = null;
        }
        if ($social_user == null) {
            return response()->json(['result' => false, 'message' => trans('No social provider matches'), 'user' => null]);
        }

        if ($request->social_provider == 'twitter') {
            $social_user_details = $social_user->userFromTokenAndSecret($request->access_token, $request->secret_token);
        } else {
            $social_user_details = $social_user->userFromToken($request->access_token);
        }

        if ($social_user_details == null) {
            return response()->json(['result' => false, 'message' => trans('No social account matches'), 'user' => null]);
        }

        $existingUserByProviderId = User::where('provider_id', $request->provider)->first();

        if ($existingUserByProviderId) {
            $existingUserByProviderId->access_token = $social_user_details->token;
            if ($request->social_provider == 'apple') {
                $existingUserByProviderId->refresh_token = $social_user_details->refreshToken;
                if (!isset($social_user->user['is_private_email'])) {
                    $existingUserByProviderId->email = $social_user_details->email;
                }
            }
            $existingUserByProviderId->save();
            return $this->loginSuccess($existingUserByProviderId);
        } else {
            $existing_or_new_user = User::firstOrNew(
                [['email', '!=', null], 'email' => $social_user_details->email]
            );

            // $existing_or_new_user->user_type = 'customer';
            $existing_or_new_user->provider_id = $social_user_details->id;

            if (!$existing_or_new_user->exists) {
                if ($request->social_provider == 'apple') {
                    if ($request->name) {
                        $existing_or_new_user->name = $request->name;
                    } else {
                        $existing_or_new_user->name = 'Apple User';
                    }
                } else {
                    $existing_or_new_user->name = $social_user_details->name;
                }
                $existing_or_new_user->email = $social_user_details->email;
                $existing_or_new_user->email_verified_at = date('Y-m-d H:m:s');
            }

            $existing_or_new_user->save();

            return $this->loginSuccess($existing_or_new_user);
        }
    }

    // Guest user Account Create
    public function guestUserAccountCreate(Request $request)
    {
        $success = 1;
        $password = substr(hash('sha512', rand()), 0, 8);
        $isEmailVerificationEnabled = get_settings('email_verification');

        // User Create
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = addon_is_activated('otp_system') ? $request->phone : null;
        $user->password = Hash::make($password);
        $user->email_verified_at = $isEmailVerificationEnabled != 1 ? date('Y-m-d H:m:s') : null;
        $user->save();

        // Account Opening and verification(if activated) eamil send
        $array['email'] = $user->email;
        $array['password'] = $password;
        $array['subject'] = trans('Account Opening Email');
        $array['from'] = env('MAIL_FROM_ADDRESS');

        try {
            Mail::to($user->email)->queue(new GuestAccountOpeningMailManager($array));
            if ($isEmailVerificationEnabled == 1) {
                $user->notify(new AppEmailVerificationNotification());
            }
        } catch (\Exception $e) {
            $success = 0;
            $user->delete();
        }

        if ($success == 0) {
            return response()->json([
                'result' => false,
                'message' => trans('Something went wrong!')
            ]);
        }

        // User Address Create
        $address = new Address();
        $address->user_id       = $user->id;
        $address->address       = $request->address;
        $address->country_id    = $request->country_id;
        $address->state_id      = $request->state_id;
        $address->city_id       = $request->city_id;
        $address->postal_code   = $request->postal_code;
        $address->phone         = $request->phone;
        $address->longitude     = $request->longitude;
        $address->latitude      = $request->latitude;
        $address->save();

        Cart::where('temp_user_id', $request->temp_user_id)
            ->update([
                'user_id' => $user->id,
                'temp_user_id' => null,
                'address_id' => $address->id
            ]);

        //create token
        $user->createToken('tokens')->plainTextToken;

        return $this->loginSuccess($user);
    }

    public function loginSuccess($user, $token = null, $tempUserId = null)
    {

        if (!$token) {
            $token = $user->createToken('API Token')->plainTextToken;
        }

        if ($tempUserId != null) {
            Cart::where('temp_user_id', $tempUserId)
                ->update([
                    'user_id' => $user->id,
                    'temp_user_id' => null
                ]);
        }

        return response()->json([
            'result' => true,
            'message' => trans('Successfully logged in'),
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_at' => null,
            'user' => [
                'id' => $user->id,
                'type' => $user->user_type,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'avatar_original' => static_asset($user->image),
                'phone' => $user->phone,
                'email_verified' => $user->email_verified_at != null
            ]
        ]);
    }


    protected function loginFailed()
    {

        return response()->json([
            'result' => false,
            'message' => trans('Login Failed'),
            'access_token' => '',
            'token_type' => '',
            'expires_at' => null,
            'user' => [
                'id' => 0,
                'type' => '',
                'name' => '',
                'email' => '',
                'avatar' => '',
                'avatar_original' => '',
                'phone' => ''
            ]
        ]);
    }


    public function account_deletion()
    {
        if (auth()->user()) {
            Cart::where('user_id', auth()->user()->id)->delete();
        }
        $auth_user = auth()->user();
        /**@disregard */
        $auth_user->tokens()->where('id', $auth_user->currentAccessToken()->id)->delete();

        User::destroy(auth()->user()->id);

        return response()->json([
            "result" => true,
            "message" => trans('Your account deletion successfully done')
        ]);
    }

    public function getUserInfoByAccessToken(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->access_token);
        if (!$token) {
            return $this->loginFailed();
        }
        $user = $token->tokenable;

        if ($user == null) {
            return $this->loginFailed();
        }

        return $this->loginSuccess($user, $request->access_token);
    }
}
