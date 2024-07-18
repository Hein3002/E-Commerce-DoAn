<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Cart;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $primaryKey = 'id';

    protected $fillable = [
        'catid',
        'brandid',
        'name', 
        'description',
        'product_detail',
        'quantity',
        'price',
        'discount',
        'status',
    ];

    public function brands(){
        return $this->belongsTo(Brand::class,'brandid','id');
    }

    public function categories(){
        return $this->belongsTo(Category::class,'catid','id');
    }

    public function carts(){
        return $this->hasMany(Cart::class,'proid','id');
    }
   
    public function images(){
        return $this->hasMany(Image::class,'proid','id');
    }

    public function firstImage()
    {
        return $this->hasOne(Image::class, 'proid')->oldestOfMany();
    }
}
