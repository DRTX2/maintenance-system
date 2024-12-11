<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_num_sup',
        'nam_sup',
        'ema_sup',
        'pho_sup'
    ];

    public function incomes()
    {
        return $this->hasMany(Income::class);
    }
}