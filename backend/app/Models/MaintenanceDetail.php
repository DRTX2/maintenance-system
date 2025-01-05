<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceDetail extends Model
{
    protected $fillable = [
        'id_main_bel', 
        'id_ass_bel'
    ];

    public function maintenance()
    {
        return $this->belongsTo(Maintenance::class, 'id_main_bel');
    }
    
    public function asset()
    {
        return $this->belongsTo(Asset::class, 'id_ass_bel');
    }

    public function observations()
    {
        return $this->hasMany(Observation::class, 'id_det_main_obs');
    }

    public function activities()
    {
        return $this->belongsToMany(MaintenanceActivity::class, 'activity_maintenance_details', 'id_main', 'id_act');
    }

    public function replacedComponents()
    {
        return $this->hasMany(ReplacedComponent::class, 'id_det_main_bel');
    }
}
