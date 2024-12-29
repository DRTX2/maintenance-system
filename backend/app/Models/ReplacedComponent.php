<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReplacedComponent extends Model
{
    protected $fillable = [
        'des_rep_com',
        'id_com_bel',
        'id_det_main_bel'
    ];

    public function component()
    {
        return $this->belongsTo(Component::class);
    }

    public function maintenanceDetail()
    {
        return $this->belongsTo(MaintenanceDetail::class);
    }
}
