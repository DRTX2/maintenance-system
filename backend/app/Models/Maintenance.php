<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    protected $fillable = [
        "dni_res_main",
        "created_at",
        "ended_at",
        "cod_man",
        "typ_man"
    ];
    public function responsible(){
        return$this->belongsTo(Responsible::class, "dni_res_main","dni_res");
    }
}
