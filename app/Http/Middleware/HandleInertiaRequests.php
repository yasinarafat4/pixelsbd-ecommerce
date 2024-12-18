<?php

namespace App\Http\Middleware;

use App\Http\Resources\Customer\CustomerResource;
use App\Http\Resources\UnreadNotificationResource;
use App\Models\Conversation;
use App\Models\DynamicPopup;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'appUrl' => config('app.url'),
            'assetUrl' => config('app.asset_url'),
            'demo_mode' => config('app.demo_mode'),
            'app_installed' => config('app.app_installed'),
            'auth' => [
                'customer' => $request->user('customer') ? new CustomerResource($request->user('customer')->load('addresses')) : null,
                'admin' => $request->user('admin'),
                'seller' => $request->user('seller'),
                'delivery_boy' => $request->user('delivery_boy'),
            ],
            'admin_notification' => $request->user('admin') ? UnreadNotificationResource::collection($request->user('admin')->unreadNotifications) : [],
            'admin_order_notification' => $request->user('admin') ? UnreadNotificationResource::collection($request->user('admin')->unreadNotifications()->where('type', 'App\Notifications\OrderNotification')->take(10)->get()) : [],
            'admin_seller_notification' => $request->user('admin') ? UnreadNotificationResource::collection($request->user('admin')->unreadNotifications()->where('type', 'like', '%shop%')->take(10)->get()) : [],
            'admin_payout_notification' => $request->user('admin') ? UnreadNotificationResource::collection($request->user('admin')->unreadNotifications()->where('type', 'App\Notifications\PayoutNotification')->take(10)->get()) : [],
            'admin_order_view_count' => $request->user('admin') ? Order::where('seller_type', 'admin')->where('viewed', 0)->count() : "",

            'seller_notification' => $request->user('seller') ? UnreadNotificationResource::collection($request->user('seller')->unreadNotifications) : [],
            'seller_order_notification' => $request->user('seller') ? UnreadNotificationResource::collection($request->user('seller')->unreadNotifications()->where('type', 'App\Notifications\OrderNotification')->take(10)->get()) : [],
            'seller_product_notification' => $request->user('seller') ? UnreadNotificationResource::collection($request->user('seller')->unreadNotifications()->where('type', 'like', '%shop%')->take(10)->get()) : [],
            'seller_payout_notification' => $request->user('seller') ? UnreadNotificationResource::collection($request->user('seller')->unreadNotifications()->where('type', 'App\Notifications\PayoutNotification')->take(10)->get()) : [],
            'seller_order_view_count' => $request->user('seller') ? Order::where('seller_type', 'seller')->where('seller_id', $request->user('seller')->id)->where('viewed', 0)->count() : "",

            'customer_notification' => $request->user('customer') ? UnreadNotificationResource::collection($request->user('customer')->unreadNotifications()->get()) : [],

            'active_currencies' => active_currency(),
            'active_currency_code' => active_currency_code(),
            'active_currency_symbol' => active_currency_symbol(),
            'default_currency_code' => default_currency_code(),
            'default_currency_symbol' => default_currency_symbol(),
            'active_locale' => session()->get('locale') ?? 'en',
            'active_languages' => active_languages(),

            'admin_conversation_count' => $request->user('admin') ? Conversation::where('receiver_user_type', 'admin')->where('receiver_id', $request->user('admin')->id)->where('receiver_viewed', '0')->count() : '',
            'seller_conversation_count' => $request->user('seller') ? Conversation::where('receiver_user_type', 'seller')->where('receiver_id', $request->user('seller')->id)->where('receiver_viewed', '0')->count() : '',
            'user_conversation_count' => $request->user('customer') ? Conversation::where('sender_user_type', 'customer')->where('sender_id', $request->user('customer')->id)->where('sender_viewed', '0')->count() : '',
            'admin_ticket_count' => $request->user('admin') ? Ticket::where('viewed', '0')->count() : '',
            'seller_ticket_count' => $request->user('seller') ? Ticket::where('user_type', 'seller')->where('user_id', $request->user('seller')->id)->where('client_viewed', '0')->count() : '',
            'user_ticket_count' => $request->user('customer') ? Ticket::where('user_type', 'customer')->where('user_id', $request->user('customer')->id)->where('client_viewed', '0')->count() : '',
            'business_settings' => business_settings(),
            // 'categories' =>  categories(),
            // 'wishlist' =>  wishlist(),
            'admin_cancel_requests_count' => $request->user('admin') ? Order::where('delivery_status', '!=', 'cancelled')->where('cancel_request', 1)->whereHas('deliveryboy', function ($q) {
                $q->where('creator_type', 'admin');
            })->with('deliveryboy')->count() : "",
            'seller_cancel_requests_count' =>  $request->user('seller') ? Order::where('delivery_status', '!=', 'cancelled')->where('cancel_request', 1)->whereHas('deliveryboy', function ($q) {
                $q->where('creator_type', 'seller')->where('creator_id', auth('seller')->user()->id);
            })->with('deliveryboy')->count() : "",
            'dynamic_popups' => dynamic_popups(),

            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error')
            ],
            'userrole' => $request->user('admin') ? $request->user('admin')->roles->pluck('name') : [],
            'userpermission' => $request->user('admin') ? $request->user('admin')->getPermissionsViaRoles()->pluck('name') : [],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                    'query' => $request->query()
                ]);
            },
        ]);
    }
}
