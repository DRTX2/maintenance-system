<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{

    protected $fillable = ['cod_inc', 'date_inc', 'est_inc', 'supplier_id'];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }


    public function assets()
    {
        return $this->hasMany(Asset::class, 'id_inc_ass');
    }

    protected $casts = [
        'date_inc' => 'date',
    ];
}