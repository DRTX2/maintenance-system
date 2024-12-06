<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;
    protected $fillable=[
        'nam_sup',
        'ema_sup',
<<<<<<< HEAD
        'pho_sup'];

=======
        'pho_sup'
    ];

    public function incomes(){
        return $this->hasMany(Income::class);
    }
>>>>>>> fc8be86625276101af048c257ebd6aafed09090f
}
