<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UploadResource extends JsonResource
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
            'name' => $this->name,
            'user_type' => $this->user_type,
            'url' => $this->url,
            'file_name' => $this->file_name,
            'mime_type' => $this->mime_type,
            'extension' => $this->extension,
            'size' => $this->size,
            'height' => $this->height,
            'width' => $this->width,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'uploaded_by' => $this->user_type == 'seller' ? $this->seller?->name : $this->admin?->name,
        ];
    }
}
