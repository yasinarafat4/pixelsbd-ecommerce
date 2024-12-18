<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
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
            'user' => $this->user,
            'ticket_replay' => TicketReplayResource::collection($this->ticket_replay),
            'user_type' => $this->user_type,
            'code' => $this->code,
            'subject' => $this->subject,
            'details' => $this->details,
            'files' => $this->files,
            'status' => $this->status,
            'viewed' => $this->viewed,
            'client_viewed' => $this->client_viewed,
            'created_at' => $this->created_at,
        ];
    }
}
