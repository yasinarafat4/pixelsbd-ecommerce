<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'photos' => $this->photos,
            'comment' => $this->comment,
            'rating' => $this->rating,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'user' => $this->user,
            'product' => new ProductResource($this->product),
        ];
    }
}
