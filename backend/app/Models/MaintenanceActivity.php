<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceActivity extends Model
{
    use HasFactory;
    protected $table="activities";
    
    protected $fillable = [
        'typ_main_id',
        'act_main',
    ];

    public function maintenanceType()
    {
        return $this->belongsTo(MaintenanceType::class, 'typ_main_id');
    }

    public function maintenanceDetails()
    {
        return $this->belongsToMany(MaintenanceDetail::class, 'activity_maintenance_details', 'id_act', 'id_main');
    }
}
