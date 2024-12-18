<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\UnreadNotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{



    public function index()
    {
        /** @disregard */
        $notifications = UnreadNotificationResource::collection(auth('customer')->user()->notifications()->latest()->paginate(15));
        auth('customer')->user()->unreadNotifications->markAsRead();
        return Inertia::render('Frontend/Themes/' . theme_name() . '/AllNotifications/AllNotifications', [
            'notifications' => $notifications
        ]);
    }
    // Notification marked as read redirect to the link
    public function readAndRedirect($id)
    {
        $notificationId = base64_decode($id);
        $notification = auth('customer')->user()->notifications->where('id', $notificationId)->first();

        // Notification mark as read
        auth('customer')->user()->unreadNotifications->where('id', $notificationId)->markAsRead();

        // Order notification redirect
        if ($notification->type == 'App\Notifications\OrderNotification') {
            return redirect()->route('purchase_history_details', base64_encode($notification->data['order_id']));
        }
        // Custom notification redirect
        elseif ($notification->type == 'App\Notifications\CustomNotification') {
            return redirect()->to($notification->data['link']);
        }
    }

    public function notification_destroy($id)
    {
        Notification::find($id)->delete();
        return redirect()->back()->with('success', trans('Notification deleted successfully!'));
    }
}
