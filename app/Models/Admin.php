<?php

namespace App\Models;

use App\Traits\PreventDemoModeChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;
    use PreventDemoModeChanges;

    protected $appends = ['user_type', 'product_count'];

    protected $fillable = [
        'name',
        'phone',
        'email',
        'image',
        'email_verified_at',
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'status',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'phone' => 'string',
        'email' => 'string',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'remember_token' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'status' => 'boolean',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'user_id')->where(['added_by' => 'admin']);
    }

    public function getUserTypeAttribute()
    {
        return "admin";
    }
    public function getProductCountAttribute()
    {
        return $this->products->count();
    }
}
