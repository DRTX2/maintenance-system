<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    protected $fillable = [
        "created_at",
        "ended_at",
        "cod_man",
        "typ_man"
    ];
}
