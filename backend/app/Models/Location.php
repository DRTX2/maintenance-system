<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{

    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = ["cod_loc", "nam_loc"];

}
