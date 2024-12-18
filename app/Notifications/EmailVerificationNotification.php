<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmailVerificationNotification extends Notification
{
    use Queueable;


    public function __construct() {}

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $notifiable->verification_code = encrypt($notifiable->id);
        $notifiable->save();

        $array['view'] = 'emails.verification';
        $array['subject'] = trans('Email Verification');
        $array['content'] = trans('Please click the button below to verify your email address.');
        $array['link'] = route('email.verification.confirmation', $notifiable->verification_code);

        return (new MailMessage)
            ->view('emails.verification', ['array' => $array])
            ->subject(trans('Email Verification - ') . env('APP_NAME'));
    }

    public function toArray($notifiable) {}
}
