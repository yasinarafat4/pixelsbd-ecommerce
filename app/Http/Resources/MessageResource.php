<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'messages' => $this->messages,
            'user' => $this->user,
            'created_at' => $this->created_at,
            'seen_at' => $this->seen_at,
        ];
    }
}
