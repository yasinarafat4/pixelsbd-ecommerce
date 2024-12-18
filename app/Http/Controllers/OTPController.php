<?php

namespace App\Http\Controllers;

use App\Models\OtpConfiguration;
use Illuminate\Http\Request;

class OTPController extends Controller
{
    public function __construct()
    {
        // Staff Permission Check
        $this->middleware(['permission:otp_configurations'])->only('configure_index');
        $this->middleware(['permission:sms_providers_configurations'])->only('credentials_index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function configure_index()
    {
        $otp_configurations = OtpConfiguration::all();
        return view('backend.otp_systems.configurations.activation', compact('otp_configurations'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function credentials_index()
    {
        $otp_configurations = OtpConfiguration::all();
        return view('backend.otp_systems.configurations.index', compact('otp_configurations'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateActivationSettings(Request $request)
    {
        $business_settings = OtpConfiguration::where('type', $request->type)->first();
        if ($business_settings != null) {
            $business_settings->value = $request->value;
            $business_settings->save();
        } else {
            $business_settings = new OtpConfiguration;
            $business_settings->type = $request->type;
            $business_settings->value = $request->value;
            $business_settings->save();
        }
        return '1';
    }

    /**
     * Update the specified resource in .env
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update_credentials(Request $request)
    {
        foreach ($request->types as $key => $type) {
            $this->overWriteEnvFile($type, $request[$type]);
        }

        flash_success("Settings updated successfully");
        return back();
    }

    /**
     *.env file overwrite
     */
    public function overWriteEnvFile($type, $val)
    {
        $path = base_path('.env');
        if (file_exists($path)) {
            $val = '"' . trim($val) . '"';
            if (is_numeric(strpos(file_get_contents($path), $type)) && strpos(file_get_contents($path), $type) >= 0) {
                file_put_contents($path, str_replace(
                    $type . '="' . env($type) . '"',
                    $type . '=' . $val,
                    file_get_contents($path)
                ));
            } else {
                file_put_contents($path, file_get_contents($path) . "\r\n" . $type . '=' . $val);
            }
        }
    }
}
