<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\NewsletterMailManager;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MarketingController extends Controller
{

    public function newsletters(Request $request)
    {

        $dataArr['users_email'] = User::select('email as value', 'email as label')->get();
        $dataArr['subscribers_email'] = Subscriber::select('email as value', 'email as label')->get();
        return Inertia::render('Admin/Marketing/Newsletters', [
            'dataArr' => $dataArr,
        ]);
    }

    public function send_newsletter(Request $request)
    {
        if ($request->users_email) {

            foreach ($request->users_email as $user_email) {
                Mail::to($user_email)->send(new NewsletterMailManager($request->all()));
            }
        }
        if ($request->subscribers_email) {
            foreach ($request->subscribers_email as $subscriber_email) {
                Mail::to($subscriber_email)->send(new NewsletterMailManager($request->all()));
            }
        }
        flash_success(trans('Mail sent successfully!'));
        return back();
    }

    public function subscribers(Request $request)
    {
        $subscribers = Subscriber::latest()->paginate(10);
        return Inertia::render('Admin/Marketing/Subscribers', [
            'subscribers' => $subscribers
        ]);
    }

    public function subscriber_store(Request $request)
    {
        $request->validate([
            'email' => 'required',
        ]);
        $subscriber = new Subscriber();
        $subscriber->email = $request->email;
        $subscriber->save();
        flash_success('You have subscribed successfully!');
        return back();
    }

    public function subscriber_delete($id)
    {
        $subscriber = Subscriber::find($id);
        $subscriber->delete();
        flash_success('Subscriber deleted successfully!');
    }

    public function unsubscribe($email)
    {
        $subscriber = Subscriber::where('email', $email)->first();
        $subscriber->delete();
        flash_success('Successfully unsubscribed!');
    }
}
