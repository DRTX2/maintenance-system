<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Component extends Model
{
    protected $hidden = ['created_at', 'updated_at', 'pivot'];
    protected $fillable = ["cod_com", "nam_com", "des_com"];


    public function categories(): BelongsToMany
    {

        return $this->belongsToMany(Category::class);
    }

    public function assets(): BelongsToMany
    {

        return $this->belongsToMany(Asset::class, 'asset_component')
            ->withPivot('description', 'observation')
            ->withTimestamps();
    }

}