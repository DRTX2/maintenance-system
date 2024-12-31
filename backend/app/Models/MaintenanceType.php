<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceType extends Model
{
    use HasFactory;
    protected $table = 'type_maintenances'; 

    protected $fillable = [
        'typ_main',
    ];

    public function activities()
    {
        return $this->hasMany(MaintenanceActivity::class, 'typ_main_id');
    }
}
