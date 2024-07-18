<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts';

    protected $primaryKey = 'id';

    protected $fillable = [
        'userid',
        'proid',
        'size',
        'color',
        'price',
        'total',
        'quantity',
        'status',
    ];

    public function users(){
        return $this->belongsTo(User::class,'userid','id');
    }

    public function products(){
        return $this->belongsTo(Product::class,'proid','id');
    }

    public static function totals($userid){
        return self::where('userid', $userid)->sum('total');
    }
}
