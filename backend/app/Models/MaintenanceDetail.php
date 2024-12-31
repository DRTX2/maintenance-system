<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceDetail extends Model
{
    protected $fillable = [
        "dni_res_main",
        "created_at",
    ];

    public function observations()
    {
        return $this->hasMany(Observation::class);
    }

    public function activities()
    {
        return $this->belongsToMany(MaintenanceActivity::class, "activity_maintenance");
    }
    // relacion para mantenimiento, componentes a reemplazar,
    public function maintenance()
    {
        return $this->belongsTo(Maintenance::class);
    }

    public function replacedComponents()
    {
        return $this->hasMany(ReplacedComponent::class);
    }
}
