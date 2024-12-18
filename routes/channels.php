<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('sender-{sender_id}receiver-{receiver_id}', function ($user, int $sender_id, int $receiver_id) {
    return true;
}, ['guards' => ['customer', 'seller', 'admin']]);

Broadcast::channel('test.{user_id}', function ($user, int $user_id) {
    return true;
}, ['guards' => ['customer', 'seller', 'admin']]);

Broadcast::channel('order_notification.{user_id}', function ($user, int $user_id) {
    return true;
}, ['guards' => ['customer', 'seller', 'admin']]);

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['customer', 'seller', 'admin']]);
