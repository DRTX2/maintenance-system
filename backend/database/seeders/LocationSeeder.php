<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Location::create([
            'cod_loc' => 'ED_LAB08',
            'nam_loc' => 'DITIC',
        ]);

        Location::create([
            'cod_loc' => 'ED_LAB09',
            'nam_loc' => 'Laboratorio de redes2',
        ]);
    }
}
