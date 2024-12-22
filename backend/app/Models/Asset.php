<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $fillable = [
        "cod_ass",
        "ser_num_ass",
        "id_inc_ass",
        "id_cat_ass",
        "id_loc_ass"
    ];

    public function income()
    {
        return $this->belongsTo(Income::class, "id_inc_ass");
    }

    public function category()
    {
        return $this->belongsTo(Category::class, "id_inc_ass");
    }

    public function location()
    {
        return $this->belongsTo(Location::class, "id_inc_ass");
    }

}