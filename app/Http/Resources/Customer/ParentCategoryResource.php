<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParentCategoryResource extends JsonResource
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
            'slug' => $this->slug,
            'icon' => $this->icon,
            'cover_image' => $this->cover_image,
            'banner_image' => $this->banner_image,
            'depth' => $this->depth,
            'children' => ParentCategoryResource::collection($this->whenLoaded('children')),
        ];
    }
}
