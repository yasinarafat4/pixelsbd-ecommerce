<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $f_name
 * @property string $l_name
 * @property string $country_code
 * @property string $phone
 * @property string $image
 * @property string $email
 * @property string $password
 * @property string $status
 * @property string $bank_name
 * @property string $branch
 * @property string $account_no
 * @property string $holder_name
 * @property string $auth_token
 * @property float $sales_commission_percentage
 * @property float $gst
 * @property string $cm_firebase_token
 * @property string $pos_status
 * @property float $minimum_order_amount
 * @property string $free_delivery_status
 * @property float $free_delivery_over_amount
 * @property string $app_language
 */
class Seller extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $appends = ['user_type', 'name', 'product_count'];

    protected $fillable = [
        'f_name',
        'l_name',
        'country_code',
        'phone',
        'email',
        'seller_id',
        'free_delivery_over_amount',
        'image',
        'password',
        'status',
        'bank_name',
        'branch',
        'account_no',
        'holder_name',
        'auth_token',
        'sales_commission_percentage',
        'gst',
        'cm_firebase_token',
        'pos_status',
        'minimum_order_amount',
        'free_delivery_status',
        'app_language',
    ];

    protected $casts = [
        'id' => 'integer',
        'f_name' => 'string',
        'l_name' => 'string',
        'country_code' => 'string',
        'orders_count' => 'integer',
        'product_count' => 'integer',
        'pos_status' => 'integer'
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $with = ['shop', 'products'];


    // Relations
    public function shop(): HasOne
    {
        return $this->hasOne(Shop::class, 'seller_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'user_id')->where(['added_by' => 'seller']);
    }


    // public function coupon():HasMany
    // {
    //     return $this->hasMany(Coupon::class, 'seller_id')
    //         ->where(['coupon_bearer'=>'seller', 'status'=>1])
    //         ->whereDate('start_date','<=',date('Y-m-d'))
    //         ->whereDate('expire_date','>=',date('Y-m-d'));
    // }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function getUserTypeAttribute()
    {
        return "seller";
    }

    public function getNameAttribute()
    {
        return $this->f_name . ' ' . $this->l_name;
    }

    public function getProductCountAttribute()
    {
        return $this->products->count();
    }
}
