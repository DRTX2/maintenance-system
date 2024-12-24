<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Responsible extends Model
{
    protected $primaryKey = 'dni_res';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ["dni_res", "nam_res", "las_res","ema_res", "pho_res", "is_ext"];

    public function maintenances(){
        return $this->hasMany(Maintenance::class,'dni_res_main','dni_res');
    }
}
