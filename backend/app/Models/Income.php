<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    
<<<<<<< HEAD
    protected $fillable=[];
}
=======
    protected $fillable=["est_inc", "id_sup_inc"];

    public function supplier(){
        return $this->belongsTo(Supplier::class);
    }
}
>>>>>>> fc8be86625276101af048c257ebd6aafed09090f
