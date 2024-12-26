<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceActivity extends Model
{
    use HasFactory;
    protected $table="activity_maintenances";
    
    protected $fillable = [
        'typ_main_id',
        'act_main',
    ];

    public function maintenanceType()
    {
        return $this->belongsTo(MaintenanceType::class, 'typ_main_id');
    }
}
