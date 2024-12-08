<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{

    protected $fillable = ["est_inc", "id_sup_inc"];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}