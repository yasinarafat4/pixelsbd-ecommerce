<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends ParrentModel
{
    use HasFactory;

    protected $fillable = [
        'user_type',
    ];

    public function user()
    {
        if ($this->user_type == 'admin') {
            return $this->belongsTo(Admin::class, 'user_id');
        } elseif ($this->user_type == 'seller') {
            return $this->belongsTo(Seller::class, 'user_id');
        } else {
            return $this->belongsTo(User::class, 'user_id');
        }
    }

    public function ticket_replay()
    {
        return $this->hasMany(TicketReplay::class);
    }
}
