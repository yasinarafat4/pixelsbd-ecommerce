<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributeResource extends JsonResource
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
            'attributeValue' => AttributeValueResource::collection($this->whenLoaded('attributeValue')),
            'categories' => AttributeCategoryResource::collection($this->whenLoaded('categories')),
        ];
    }
}
