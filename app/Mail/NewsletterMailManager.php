<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterMailManager extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    /**
     * Create a new message instance.
     */
    public function __construct($newsletterData)
    {
        $this->data = $newsletterData;
    }

    public function build()
    {
        return $this->view('emails.newsletter')
            ->from('')
            ->subject('')
            ->with([
                'data' => $this->data,
            ]);
    }
}
