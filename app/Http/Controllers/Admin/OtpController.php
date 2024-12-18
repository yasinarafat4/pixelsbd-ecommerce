<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\OTP;
use App\Models\SmsTemplate;

class OtpController extends Controller
{
    public function otp_configuration(Request $request)
    {
        return Inertia::render('Admin/Plugins/Otp/OtpConfiguration/OtpConfiguration');
    }

    public function sms_templates(Request $request)
    {
        $templatesData['number_verification'] = SmsTemplate::where('identifier', 'number_verification')->first();
        $templatesData['password_reset'] = SmsTemplate::where('identifier', 'password_reset')->first();
        $templatesData['order_placement'] = SmsTemplate::where('identifier', 'order_placement')->first();
        $templatesData['delivery_status_change'] = SmsTemplate::where('identifier', 'delivery_status_change')->first();
        $templatesData['payment_status_change'] = SmsTemplate::where('identifier', 'payment_status_change')->first();
        $templatesData['assign_delivery_boy'] = SmsTemplate::where('identifier', 'assign_delivery_boy')->first();
        $templatesData['account_opening'] = SmsTemplate::where('identifier', 'account_opening')->first();
        return Inertia::render('Admin/Plugins/Otp/SmsTemplates/SmsTemplates', $templatesData);
    }


    public function sms_templates_update(Request $request)
    {
        SmsTemplate::updateOrInsert(
            ['identifier' => $request->identifier],
            ['sms_body' => $request->sms_body, 'template_id' => $request->template_id, 'status' => $request->status],
        );

        return back()->with('success', 'Template updated successfully!');
    }

    public function destroy($id) {}
}
