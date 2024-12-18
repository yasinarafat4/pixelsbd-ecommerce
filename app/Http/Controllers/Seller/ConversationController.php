<?php

namespace App\Http\Controllers\Seller;

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


    public function seller_conversation(Request $request)
    {

        $conversations = ConversationsResource::collection(Conversation::where('sender_user_type', 'seller')->where('sender_id', auth('seller')->user()->id)->orWhere('receiver_user_type', 'seller')->orWhere('receiver_id', auth('seller')->user()->id)->latest()->paginate(15));
        return Inertia::render('Seller/Conversation/Conversation', [
            'conversations' => $conversations
        ]);
    }

    public function seller_conversation_details($id)
    {
        $conversation = Conversation::find(base64_decode($id));
        if ($conversation->sender_id == auth('seller')->user()->id) {
            $conversation->sender_viewed = '1';
        } else if ($conversation->receiver_id == auth('seller')->user()->id) {
            $conversation->receiver_viewed = '1';
        }
        $conversation->save();

        $message =  $conversation->messages->last();
        if ($message->user_id != auth('seller')->user()->id && $message->seen_at == null) {
            $message->seen_at = date('Y-m-d H:i:s');
            $message->save();
        }
        return Inertia::render('Seller/Conversation/ConversationDetails', [
            'conversation' => new ConversationsResource($conversation)
        ]);
    }

    public function seller_replay_store(Request $request)
    {
        $message = new Message();
        $message->conversation_id = $request->conversation_id;
        $message->user_id = auth('seller')->user()->id;
        $message->user_type = auth('seller')->user()->user_type;
        $message->messages = $request->message;
        $message->save();
        $conversation = $message->conversation;
        if ($conversation->sender_id == auth('seller')->user()->id) {
            $conversation->sender_viewed = '1';
            $conversation->receiver_viewed = '0';
        } else if ($conversation->receiver_id == auth('seller')->user()->id) {
            $conversation->sender_viewed = '0';
            $conversation->receiver_viewed = '1';
        }
        $conversation->save();

        foreach ($conversation->messages as $key => $msg) {
            if ($msg->user_id != auth('seller')->user()->id && $msg->seen_at == null) {
                $msg->seen_at = date('Y-m-d H:i:s');
                $msg->save();
            }
        }


        broadcast(new MessageEvent($conversation->sender_id, $conversation->receiver_id, $conversation->id));
    }
}
