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
        'pho_sup'];

}
