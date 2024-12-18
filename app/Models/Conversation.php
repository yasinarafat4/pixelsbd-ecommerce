<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends ParrentModel
{
    use HasFactory;

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function sender()
    {
        if ($this->sender_user_type == 'admin') {
            return $this->belongsTo(Admin::class, 'sender_id')->withTrashed();
        } elseif ($this->sender_user_type == 'seller') {
            return $this->belongsTo(Seller::class, 'sender_id')->withTrashed();
        } else {
            return $this->belongsTo(User::class, 'sender_id')->withTrashed();
        }
    }

    public function receiver()
    {
        if ($this->receiver_user_type == 'admin') {
            return $this->belongsTo(Admin::class, 'receiver_id')->withTrashed();
        } elseif ($this->receiver_user_type == 'seller') {
            return $this->belongsTo(Seller::class, 'receiver_id')->withTrashed();
        } else {
            return $this->belongsTo(User::class, 'receiver_id')->withTrashed();
        }
    }
}
