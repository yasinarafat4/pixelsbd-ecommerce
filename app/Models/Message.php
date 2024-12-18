<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends ParrentModel
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'user_id',
        'user_type',
        'messages',
        'seen_at'
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        if ($this->user_type == 'admin') {
            return $this->belongsTo(Admin::class, 'user_id')->withTrashed();
        } elseif ($this->user_type == 'seller') {
            return $this->belongsTo(Seller::class, 'user_id')->withTrashed();
        } else {
            return $this->belongsTo(User::class, 'user_id')->withTrashed();
        }
    }
}
