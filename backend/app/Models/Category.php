<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    // protected $table = "categories";
    // protected $unique = ['cod_dis'];
    // protected $primaryKey = "id";
    protected $hidden = ['created_at', 'updated_at'];

    public function components(): BelongsToMany
    {
        return $this->belongsToMany(Component::class);
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, "id_inc_ass");
    }

}