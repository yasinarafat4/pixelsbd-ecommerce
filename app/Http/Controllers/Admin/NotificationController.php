<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CustomNotificationResource;
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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{

    public function __construct() {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/Notification/Index');
    }
    public function create()
    {
        return Inertia::render('Admin/Notification/Create');
    }
    public function store(Request $request) {}
    public function edit($id)
    {
        return Inertia::render('Admin/Notification/Edit');
    }
    public function update(Request $request, $id) {}
    public function destroy($id) {}

    public function notification_settings(Request $request)
    {
        return Inertia::render('Admin/Marketing/Notification/NotificationSettings');
    }

    public function notification_types(Request $request)
    {
        $type = '';
        if ($request->has('tab')) {
            $type = $request->input('tab');
        } else {
            $type = "customer";
        }

        $test = ['tab' => $type];
        $notifications = NotificationType::where('user_type', $type)->paginate(10)->appends($test);
        return Inertia::render('Admin/Marketing/Notification/NotificationTypes/NotificationTypes', [
            'tab' => $request->input('tab'),
            'notifications' => $notifications,
        ]);
    }

    public function notification_types_store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'text' => 'required',
        ]);
        $request->tab;
        $types = new NotificationType();
        $types->type = "custom";
        $types->name = $request->name;
        $types->image = $request->image;
        $types->text = $request->text;
        $types->user_type = $request->tab ?? 'customer';
        $types->status = 1;
        $types->save();
        return back()->with('success', trans('Notification type added successfully!'));
    }

    public function notification_type_update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'text' => 'required',
        ]);
        $types = NotificationType::find($id);
        $types->name = $request->name;
        $types->image = $request->image;
        $types->text = $request->text;
        $types->save();
        return redirect(route('admin.marketing.notification.notification_types'))->with('success', trans('Notification type updated successfully!'));
    }

    public function notification_type_edit($id)
    {
        $notification_type = NotificationType::find($id);
        return Inertia::render('Admin/Marketing/Notification/NotificationTypes/NotificationTypeEdit', [
            'notification_type' => $notification_type,
        ]);
    }

    public function notification_type_delete($id)
    {
        $notification_type = NotificationType::find($id);
        DB::table('notifications')->where('notification_type_id', $notification_type->id)->delete();
        $notification_type->delete();

        flash_success(trans('Notification type deleted successfully'));
    }


    public function notification_type_status(Request $request, $id)
    {
        $notification_type = NotificationType::find($id);
        $notification_type->status = $request->status;
        $notification_type->save();
        return back()->with('success', trans('Notification type status updated successfully!'));
    }


    public function custom_notification(Request $request)
    {
        $customNotificationTypes = NotificationType::where('type', 'custom')->where('status', 1)->get();
        $customers = User::where('email_verified_at', '!=', null)->where('banned', 0)->get();
        return Inertia::render('Admin/Marketing/Notification/CustomNotification', [
            'customers' => $customers,
            'customNotificationTypes' => $customNotificationTypes,
        ]);
    }

    // Custom Notification Send
    public function sendCustomNotification(Request $request)
    {
        $request->validate([
            'user_ids' => 'required',
            'notification_type_id' => 'required',
            'link' => ['max:255'],
        ]);

        foreach ($request->user_ids as $user_id) {
            $user = User::where('id', $user_id)->first();
            $data = array();
            $data['link'] = $request->link;
            $data['notification_type_id'] = $request->notification_type_id;

            Notification::send($user, new CustomNotification($data));
        }
        flash_success(trans('Notification has been sent successfully'));
        return back();
    }

    public function custom_notification_history(Request $request)
    {
        $custom_notifications = CustomNotificationResource::collection(DB::table('notifications')->groupBy(DB::raw('Date(created_at)'), 'notification_type_id')->where('type', 'App\Notifications\CustomNotification')->orderBy('created_at', 'desc')->paginate(10));
        return Inertia::render('Admin/Marketing/Notification/CustomNotificationHistory', [
            'custom_notifications' => $custom_notifications
        ]);
    }

    // Modal Function
    public function custom_notified_customers_list(Request $request)
    {
        $var = explode("_", $request->identifier);
        $type = $var[0];
        $created_at = date('Y-m-d', strtotime($var[1]));
        $notifications = DB::table('notifications')->where('notification_type_id', $type)->where(DB::raw('Date(created_at)'), $created_at)->get();
        $notified_user_list = [];
        foreach ($notifications as $key => $notification) {
            $user = User::where('id', $notification->notifiable_id)->first();
            array_push($notified_user_list, $user);
        }
        $notificationType = get_notification_type($notifications[0]->notification_type_id, 'id');
        $content = $notificationType->text;
        $link = json_decode($notifications[0]->data, true)['link'];

        $data['notified_user_list'] = $notified_user_list;
        $data['text'] = $content;
        $data['link'] = $link;

        return $data;
    }

    // Custom Notification delete
    public function custom_notification_delete($identifier)
    {
        $var = explode("_", $identifier);
        $type = $var[0];
        $created_at = date('Y-m-d', strtotime($var[1]));
        DB::table('notifications')->where('notification_type_id', $type)->where(DB::raw('Date(created_at)'), $created_at)->delete();
        flash_success(trans('Custom notification deleted successfully'));
    }


    // groupBy(DB::raw('Date(created_at)'), 'notification_type_id')

    public function readAndRedirect($id)
    {
        // return $id;
        $notificationId = base64_decode($id);
        $notification = auth('admin')->user()->notifications->where('id', $notificationId)->first();

        // Notification mark as read
        auth('admin')->user()->unreadNotifications->where('id', $notificationId)->markAsRead();

        // Order notification redirect
        if ($notification->type == 'App\Notifications\OrderNotification') {
            return redirect()->route('admin.orders.show', base64_encode($notification->data['order_id']));
        }
        // Payout notification redirect
        elseif ($notification->type == 'App\Notifications\PayoutNotification') {
            // return redirect()->route('purchase_history_details', base64_encode($notification->data['order_id']));
        }
        // ShopProduct notification redirect
        elseif ($notification->type == 'App\Notifications\ShopProductNotification') {

            return redirect()->route('admin.product.product_edit', ['lang' => 'en', 'id' => base64_encode($notification->data['id'])]);
        }
        // ShopVerification notification redirect
        elseif ($notification->type == 'App\Notifications\ShopVerificationNotification') {
            return redirect()->route('admin.seller.verification', base64_encode($notification->data['id']));
        }
        // Custom notification redirect
        elseif ($notification->type == 'App\Notifications\CustomNotification') {
            return redirect()->to($notification->data['link']);
        }
    }

    public function all_notifications()
    {
        /** @disregard */
        $notifications = UnreadNotificationResource::collection(auth('admin')->user()->notifications()->latest()->paginate(15));
        auth('admin')->user()->unreadNotifications->markAsRead();
        return Inertia::render('Admin/AllNotifications/AllNotifications', [
            'notifications' => $notifications
        ]);
    }

    public function notification_destroy($id)
    {
        ModelsNotification::find($id)->delete();
        return back()->with('success', trans('Notification deleted successfully!'));
    }
}
