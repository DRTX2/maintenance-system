<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    protected $fillable = [ "id_det_main_obs", "des_obs"];

    public function maintenance(){
        return $this->belongsTo(MaintenanceDetail::class,'id_det_main_obs');
    }
}
