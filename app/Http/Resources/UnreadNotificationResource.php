<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UnreadNotificationResource extends JsonResource
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
            'type' => $this->type,
            'created_at' => $this->created_at,
            'data' => $this->data,
            'notificationType' => get_notification_type($this->notification_type_id, 'id'),
            'notificationShowDesign' => get_settings('notification_show_type'),
            'notifyContent' => get_notification_content($this->id, $this->notification_type_id, $this->type, $this->data)
        ];
    }
}
