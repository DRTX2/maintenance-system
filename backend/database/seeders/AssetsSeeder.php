<?php

namespace Database\Seeders;

use App\Models\Asset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssetsSeeder extends Seeder
{
    public function run(): void
    {
        Asset::create([
            'id_inc_ass' => 1, 
            'id_cat_ass' => 1, 
            'id_loc_ass' => 1, 
            'cod_ass' => 'ASSET001', 
            'ser_num_ass' => 'SERIAL001', 
            'obs_add_ass' => 'Primer activo',
            'est_ass' => 'V', 
        ]);

        Asset::create([
            'id_inc_ass' => 1,
            'id_cat_ass' => 2,
            'id_loc_ass' => 2,
            'cod_ass' => 'ASSET002',
            'ser_num_ass' => 'SERIAL002', 
            'obs_add_ass' => 'Segundo activo',
            'est_ass' => 'H', 
        ]);
    }
}
