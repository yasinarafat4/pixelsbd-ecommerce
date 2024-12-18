<?php

namespace App\Events;

use App\Http\Resources\ConversationsResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender_id;
    public $receiver_id;
    public $id;
    /**
     * Create a new event instance.
     */
    public function __construct($sender_id, $receiver_id, $id)
    {
        $this->id = $id;
        $this->sender_id = $sender_id;
        $this->receiver_id = $receiver_id;
    }

    public function broadcastOn()
    {
        // return new Channel('sender-' . $this->sender_id . 'receiver-' . $this->receiver_id);
        return [
            new PrivateChannel('sender-' . $this->sender_id . 'receiver-' . $this->receiver_id)
        ];
    }
}
