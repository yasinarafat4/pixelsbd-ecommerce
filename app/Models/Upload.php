<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upload extends ParrentModel
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'url',
        'file_name',
        'user_id',
        'user_type',
        'extension',
        'mime_type',
        'size',
    ];

    protected $appends = [
        'users',
    ];

    // public function user()
    // {
    //     if ($this->user_type == 'seller') {
    //         return $this->belongsTo(Seller::class, 'user_id');
    //     } else {
    //         return $this->belongsTo(Admin::class, 'user_id');
    //     }
    // }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class, 'user_id');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'user_id');
    }

    public function getUsersAttribute()
    {
        if ($this->user_type == 'seller') {
            return $this->seller;
        }
        if ($this->user_type == 'admin') {
            return $this->admin;
        }
        return null;
    }
}
