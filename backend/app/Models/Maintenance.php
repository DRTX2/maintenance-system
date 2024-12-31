<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    protected $fillable = [
        "dni_res_main",
        "created_at",
        "ended_at",
        "cod_main",
        "vis_main",
        "id_typ_main"
    ];

    protected $casts = [
        "ended_at"=>"datetime",
        "created_at"=>"datetime",
    ];

    public function responsible(){
        return$this->belongsTo(Responsible::class, "dni_res_main","dni_res");
    }

    public function maintenanceType()
    {
        return $this->belongsTo(MaintenanceType::class, 'id_typ_main');
    }

    public function maintenanceDetails()
    {
        return $this->hasMany(MaintenanceDetail::class, 'id_main_bel');
    }
}
