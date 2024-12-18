<?php

namespace App\Http\Controllers\Frontend;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\ConversationsResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversationController extends Controller
{

    public function customer_conversations(Request $request)
    {
        $conversations = ConversationsResource::collection(Conversation::where('sender_user_type', 'customer')->where('sender_id', auth('customer')->user()->id)->orWhere('receiver_user_type', 'customer')->orWhere('receiver_id', auth('customer')->user()->id)->latest()->paginate(15));
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/Conversations', [
            'conversations' => $conversations
        ]);
    }

    public function customer_conversation_details($id)
    {
        $conversation = Conversation::find(base64_decode($id));
        if ($conversation->sender_id == auth('customer')->user()->id) {
            $conversation->sender_viewed = '1';
        } else if ($conversation->receiver_id == auth('customer')->user()->id) {
            $conversation->receiver_viewed = '1';
        }
        $conversation->save();
        $message =  $conversation->messages->last();
        if ($message->user_id != auth('customer')->user()->id && $message->seen_at == null) {
            $message->seen_at = date('Y-m-d H:i:s');
            $message->save();
        }
        return Inertia::render('Frontend/Themes/' . theme_name() . '/UserDashboard/UserDashboardPages/ConversationDetails', [
            'conversation' => new ConversationsResource($conversation)
        ]);
    }
    public function customer_conversation_messages($id)
    {
        $conversation = Conversation::find($id);
        $messages = MessageResource::collection($conversation->messages);
        return $messages;
    }

    public function conversations_store(Request $request)
    {
        $conversation = new Conversation();
        $conversation->sender_id = Auth::user()->id;
        $conversation->sender_user_type = Auth::user()->user_type;
        $conversation->receiver_id = $request->receiver_id;
        $conversation->receiver_user_type = $request->receiver_user_type;
        $conversation->title = $request->title;
        $conversation->save();
        $message = new Message();
        $message->conversation_id = $conversation->id;
        $message->messages = $request->message;
        $message->user_id = Auth::user()->id;
        $message->user_type = Auth::user()->user_type;
        $message->save();
        flash_success(trans('Your Message has been sent!'));
    }

    public function customer_replay_store(Request $request)
    {
        $message = new Message();
        $message->conversation_id = $request->conversation_id;
        $message->user_id = auth('customer')->user()->id;
        $message->user_type = auth('customer')->user()->user_type;
        $message->messages = $request->message;
        $message->save();
        $conversation = $message->conversation;
        if ($conversation->receiver_id == auth('customer')->user()->id) {
            $conversation->sender_viewed = '0';
            $conversation->receiver_viewed = '1';
        } else if ($conversation->sender_id == auth('customer')->user()->id) {
            $conversation->sender_viewed = '1';
            $conversation->receiver_viewed = '0';
        }
        $conversation->save();
        foreach ($conversation->messages as $key => $msg) {
            if ($msg->user_id != auth('customer')->user()->id && $msg->seen_at == null) {
                $msg->seen_at = date('Y-m-d H:i:s');
                $msg->save();
            }
        }
        event(new MessageEvent($conversation->sender_id, $conversation->receiver_id, $conversation->id));
    }
}
