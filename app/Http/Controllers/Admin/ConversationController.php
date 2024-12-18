<?php

namespace App\Http\Controllers\Admin;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\ConversationsResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversationController extends Controller
{

    public function admin_conversations(Request $request)
    {
        $conversations = ConversationsResource::collection(Conversation::latest()->paginate(10));
        return Inertia::render('Admin/Support/ProductConversations/ProductConversations', [
            'conversations' => $conversations
        ]);
    }

    public function admin_conversation_details($id)
    {
        $conversation = Conversation::find(base64_decode($id));
        if ($conversation->sender_id == auth('admin')->user()->id) {
            $conversation->sender_viewed = '1';
        } else if ($conversation->receiver_id == auth('admin')->user()->id) {
            $conversation->receiver_viewed = '1';
        }
        $conversation->save();
        $message =  $conversation->messages->last();
        if ($message->user_id != auth('admin')->user()->id && $message->seen_at == null) {
            $message->seen_at = Carbon::now();
            $message->save();
        }
        return Inertia::render('Admin/Support/ProductConversations/ProductConversationDetails', [
            'conversation' => new ConversationsResource($conversation)
        ]);
    }

    public function admin_replay_store(Request $request)
    {

        $message = new Message();
        $message->conversation_id = $request->conversation_id;
        $message->user_id = auth('admin')->user()->id;
        $message->user_type = auth('admin')->user()->user_type;
        $message->messages = $request->message;
        $message->save();
        $conversation = $message->conversation;
        if ($conversation->sender_id == auth('admin')->user()->id) {
            $conversation->sender_viewed = '1';
            $conversation->receiver_viewed = '0';
        } else if ($conversation->receiver_id == auth('admin')->user()->id) {
            $conversation->sender_viewed = '0';
            $conversation->receiver_viewed = '1';
        }
        $conversation->save();
        foreach ($conversation->messages as $key => $msg) {
            if ($msg->user_id != auth('admin')->user()->id && $msg->seen_at == null) {
                $msg->seen_at = Carbon::now();
                $msg->save();
            }
        }
        event(new MessageEvent($conversation->sender_id, $conversation->receiver_id, $conversation->id));
    }
}
