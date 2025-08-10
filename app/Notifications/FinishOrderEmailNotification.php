<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FinishOrderEmailNotification extends Notification
{
    use Queueable;
    protected $customer;
    protected $url;

    /**
     * Create a new notification instance.
     */
    public function __construct($customer, $url)
    {
        $this->customer = $customer;
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Sukses Pembuatan ' . $this->customer->bucket->name)
                    // ->line('The introduction to the notification.')
                    // ->action('Kunjungi Website', url(env('VITE_REDIRECT_URL_PROGRESS_ORDER_CUSTOMER')))
                    // ->line('Thank you for using our application!');
                    // ->view('emails.finish-order', ['customer' => $this->customer, 'url' => $this->url]);
                    ->markdown('emails.finish-order', [
                        'customer' => $this->customer,
                        'url' => $this->url,
                        'logo_path' => public_path('img/logo_elv_florist.png')
                    ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
