<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $table = 'images';

    protected $primaryKey = 'id';

    protected $fillable = [
        'proid',
        'image',
    ];

    public $timestamps = false;

    public function products(){
        return $this->belongsTo(Product::class,'proid','id');
    }
}
