<?php

namespace App\Http\Resources\Customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryDescendantsResource extends JsonResource
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
            'parent_id' => $this->parent_id,
            'position' => $this->position,
            'digital' => $this->digital,
            'home_status' => $this->home_status,
            'featured' => $this->featured,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'icon' => $this->icon,
            'cover_image' => $this->cover_image,
            'banner_image' => $this->banner_image,
            'descendants' => CategoryDescendantsResource::collection($this->childes),
        ];
    }
}
