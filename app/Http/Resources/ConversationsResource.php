<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'created_at' => $this->created_at,
            'sender_viewed' => $this->sender_viewed,
            'receiver_viewed' => $this->receiver_viewed,
            'receiver' => $this->receiver,
            'sender' => $this->sender,
            'last_message' => $this->messages->last()->messages,
            'messages' => MessageResource::collection($this->messages),
        ];
    }
}
