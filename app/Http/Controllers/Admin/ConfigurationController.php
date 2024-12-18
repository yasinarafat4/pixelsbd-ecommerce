<?php

namespace App\Http\Controllers\Admin;

use App\Exceptions\Redirectingexception;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;
use App\Http\Controllers\Controller;
use App\Mail\EmailManager;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Laraeast\LaravelSettings\Facades\Settings;

class ConfigurationController extends Controller
{

    public function features_activation(Request $request)
    {
        $env_data = DotenvEditor::getKey('FORCE_HTTPS');
        return Inertia::render('Admin/Configurations/FeaturesActivation/Index', [
            'env_data' => $env_data
        ]);
    }

    public function FeaturesActivation(Request $request)
    {
        if (env('DEMO_MODE')) {
            flash_error(trans('Data changing action is not allowed in demo mode.'));
            return redirect()->back();
        }

        if ($request->type == 'FORCE_HTTPS' && $request->value == true) {
            envWrite('FORCE_HTTPS', 'On');
            if (strpos(env('APP_URL'), 'http:') !== FALSE) {
                envWrite('APP_URL', str_replace("http:", "https:", env('APP_URL')));
            }
        } elseif ($request->type == 'FORCE_HTTPS' && $request->value == false) {
            envWrite('FORCE_HTTPS', 'Off');
            if (strpos(env('APP_URL'), 'https:') !== FALSE) {
                envWrite('APP_URL', str_replace("https:", "http:", env('APP_URL')));
            }
        }

        if ($request->type == 'maintenance_mode' && $request->value == true) {
            if (!env('DEMO_MODE')) {
                Artisan::call('down');
            }
        } elseif ($request->type == 'maintenance_mode' && $request->value == false) {
            if (!env('DEMO_MODE')) {
                Artisan::call('up');
            }
        }
        Settings::set($request->type, $request->value);

        Artisan::call('cache:clear');
        return back()->with('success', trans('Updated successfully'));
    }

    public function smtp_setting(Request $request)
    {
        $env_data = DotenvEditor::getKeys(['MAIL_MAILER', 'MAIL_HOST', 'MAIL_PORT', 'MAIL_USERNAME', 'MAIL_PASSWORD', 'MAIL_ENCRYPTION', 'MAIL_FROM_ADDRESS', 'MAIL_FROM_NAME', 'MAILGUN_DOMAIN', 'MAILGUN_SECRET']);
        return Inertia::render('Admin/Configurations/SmtpSetting/Index', [
            'env_data' => $env_data
        ]);
    }

    public function testEmail(Request $request)
    {
        $array['view'] = 'emails.newsletter';
        $array['subject'] = "SMTP Test";
        $array['from'] = env('MAIL_FROM_ADDRESS');
        $array['content'] = "This is a test email.";

        try {
            Mail::to($request->email)->queue(new EmailManager($array));
        } catch (\Exception $e) {
            dd($e);
        }
        return back()->with('success', trans('An email has been sent.'));;
    }

    public function payment_method(Request $request)
    {
        $env_data = DotenvEditor::getKeys([
            'AAMARPAY_STORE_ID',
            'AAMARPAY_SIGNATURE_KEY',
            'AUTH_MERCHANT_LOGIN_ID',
            'AUTH_MERCHANT_TRANSACTION_KEY',
            'BKASH_CHECKOUT_APP_KEY',
            'BKASH_CHECKOUT_APP_SECRET',
            'BKASH_CHECKOUT_USER_NAME',
            'BKASH_CHECKOUT_PASSWORD',
            'IM_API_KEY',
            'IM_AUTH_TOKEN',
            'IYZICO_API_KEY',
            'IYZICO_SECRET_KEY',
            'IYZICO_CURRENCY_CODE',
            'MERCADOPAGO_KEY',
            'MERCADOPAGO_ACCESS',
            'MERCADOPAGO_CURRENCY',
            'NAGAD_MODE',
            'NAGAD_MERCHANT_ID',
            'NAGAD_MERCHANT_NUMBER',
            'NAGAD_PG_PUBLIC_KEY',
            'NAGAD_MERCHANT_PRIVATE_KEY',
            'NGENIUS_OUTLET_ID',
            'NGENIUS_API_KEY',
            'NGENIUS_CURRENCY',
            'PAYHERE_MERCHANT_ID',
            'PAYHERE_SECRET',
            'PAYHERE_CURRENCY',
            'PAYKU_BASE_URL',
            'PAYKU_PUBLIC_TOKEN',
            'PAYKU_PRIVATE_TOKEN',
            'PAYMOB_API_KEY',
            'PAYMOB_IFRAME_ID',
            'PAYMOB_INTEGRATION_ID',
            'PAYMOB_HMAC',
            'PAYPAL_CLIENT_ID',
            'PAYPAL_CLIENT_SECRET',
            'PAYSTACK_PUBLIC_KEY',
            'PAYSTACK_SECRET_KEY',
            'PAYSTACK_MERCHANT_EMAIL',
            'PAYSTACK_CURRENCY_CODE',
            'RAZOR_KEY',
            'RAZOR_SECRET',
            'SSLCZ_STORE_ID',
            'SSLCZ_STORE_PASSWD',
            'STRIPE_KEY',
            'STRIPE_SECRET',
            'VOGUE_MERCHANT_ID'
        ]);
        Inertia::share('env_data', $env_data);

        $payment_methods = PaymentMethod::whereNull('addon_identifier')->get();
        return Inertia::render('Admin/Configurations/PaymentMethod/Index', [
            'payment_methods' => $payment_methods
        ]);
    }

    public function shipping_configuration(Request $request)
    {
        return Inertia::render('Admin/Configurations/Shipping/ShippingConfiguration');
    }

    public function shipping_configuration_update(Request $request)
    {
        if (env('DEMO_MODE')) {
            flash_error(trans('Data changing action is not allowed in demo mode.'));
            return redirect()->back();
        }

        Settings::set($request->type, $request->value);

        Artisan::call('cache:clear');
        return back()->with('success', trans('Shipping Method updated successfully'));
    }

    public function social_media_logins(Request $request)
    {
        $env_data = DotenvEditor::getKeys([
            'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET',
            'FACEBOOK_CLIENT_ID',
            'FACEBOOK_CLIENT_SECRET',
            'TWITTER_CLIENT_ID',
            'TWITTER_CLIENT_SECRET',
            'APPLE_CLIENT_ID',
            'APPLE_CLIENT_SECRET'
        ]);
        return Inertia::render('Admin/Configurations/SocialMediaLogins/Index', [
            'env_data' => $env_data
        ]);
    }

    public function facebook(Request $request)
    {
        return Inertia::render('Admin/Configurations/Facebook/Index');
    }


    public function google(Request $request)
    {
        return Inertia::render('Admin/Configurations/Google/Index');
    }

    public function pusher(Request $request)
    {
        $env_data = DotenvEditor::getKeys(['PUSHER_APP_ID', 'PUSHER_APP_KEY', 'PUSHER_APP_SECRET', 'PUSHER_APP_CLUSTER']);
        return Inertia::render('Admin/Configurations/Pusher/Index', [
            'env_data' => $env_data
        ]);
    }
    public function pusher_update(Request $request)
    {
        if (env('DEMO_MODE')) {
            flash_error(trans('Data changing action is not allowed in demo mode.'));
            return redirect()->back();
        }

        foreach ($request->types as $key => $type) {
            envWrite($type, $request->$type);
        }
        if ($request->has('pusher_active')) {
            Settings::set('pusher_active', $request->pusher_active);
        }
        return back()->with('success', trans('Pusher updated successfully'));
    }

    public function payment_method_activation(Request $request)
    {
        if (env('DEMO_MODE')) {
            flash_error(trans('Data changing action is not allowed in demo mode.'));
            return redirect()->back();
        }

        try {
            $payment_method = PaymentMethod::findOrFail($request->id);
            $payment_method->status = $request->value;
            $payment_method->save();
            return back()->with('success', trans('Payment Settings updated successfully'));
        } catch (\Throwable $th) {
            return back()->with('error', trans('Something went wrong!!!'));
        }
    }

    public function payment_method_update(Request $request)
    {
        if (env('DEMO_MODE')) {
            flash_error(trans('Data changing action is not allowed in demo mode.'));
            return redirect()->back();
        }

        foreach ($request->types as $key => $type) {
            envWrite($type, $request->$type);
        }

        $payment_sandbox = $request->payment_method . '_sandbox';
        if ($request->has($payment_sandbox)) {
            Settings::set($payment_sandbox, $request->$payment_sandbox);
        }

        Artisan::call('cache:clear');

        return back()->with('success', trans('Settings updated successfully'));
    }


    public function settingsUpdate(Request $request, $lang = null)
    {
        if (env('DEMO_MODE')) {
            flash_error(trans('Data changing action is not allowed in demo mode.'));
            return redirect()->back();
        }

        // return $lang;
        $editor = DotenvEditor::load();
        foreach ($request->types as $key => $type) {
            if ($type == 'website_name') {
                if ($editor->getValue('APP_NAME') != $request->$type) {
                    envWrite('APP_NAME', $request->$type);
                }
            }
            if ($type == 'timezone') {
                if ($editor->getValue('APP_TIMEZONE') != $request->$type) {
                    envWrite('APP_TIMEZONE', $request->$type);
                }
            }
            Settings::set($type, $request->$type);
        }
        Artisan::call('cache:clear');
        return back()->with('success', trans('Updated successfully'));
    }

    public function envUpdate(Request $request)
    {

        foreach ($request->types as $key => $type) {
            envWrite($type, $request->$type);
        }
        return back()->with('success', trans('Settings updated successfully'));
    }
}
