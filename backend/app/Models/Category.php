<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "categories";
    protected $unique = ['cod_dis'];
    protected $primaryKey = "id";
    protected $fillable = [
        'cod_dis',
        'tip_dis',
        'nom_dis'
    ];

}
