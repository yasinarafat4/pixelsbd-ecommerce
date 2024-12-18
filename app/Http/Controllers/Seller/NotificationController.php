<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\UnreadNotificationResource;
use App\Models\Notification as ModelsNotification;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NotificationType;
use App\Models\User;
use App\Notifications\CustomNotification;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{

    public function __construct() {}

    public function index(Request $request)
    {
        /** @disregard */
        $notifications = UnreadNotificationResource::collection(auth('seller')->user()->notifications()->latest()->paginate(15));
        auth('seller')->user()->unreadNotifications->markAsRead();
        return Inertia::render('Seller/AllNotifications/AllNotifications', [
            'notifications' => $notifications
        ]);
    }


    public function destroy($id) {}


    public function notification_destroy($id)
    {
        ModelsNotification::find($id)->delete();
        return back()->with('success', trans('Notification deleted successfully!'));
    }



    public function readAndRedirect($id)
    {
        // return $id;
        $notificationId = base64_decode($id);
        $notification = auth('seller')->user()->notifications->where('id', $notificationId)->first();

        // Notification mark as read
        auth('seller')->user()->unreadNotifications->where('id', $notificationId)->markAsRead();

        // Order notification redirect
        if ($notification->type == 'App\Notifications\OrderNotification') {
            return redirect()->route('seller.seller_orders_view', base64_encode($notification->data['order_id']));
        }
        // Payout notification redirect
        elseif ($notification->type == 'App\Notifications\PayoutNotification') {
            return redirect()->route('payment_history', base64_encode($notification->data['order_id']));
        }
        // ShopProduct notification redirect
        elseif ($notification->type == 'App\Notifications\ShopProductNotification') {

            return redirect()->route('seller.product.product_edit', ['lang' => 'en', 'id' => base64_encode($notification->data['id'])]);
        }
        // ShopVerification notification redirect
        elseif ($notification->type == 'App\Notifications\ShopVerificationNotification') {
            // return redirect()->route('admin.seller.verification', base64_encode($notification->data['id']));
        }
        // Custom notification redirect
        elseif ($notification->type == 'App\Notifications\CustomNotification') {
            return redirect()->to($notification->data['link']);
        }
    }
}
