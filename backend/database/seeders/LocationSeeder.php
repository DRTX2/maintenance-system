<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        Location::create([
            'cod_loc' => 'E01',
            'nam_loc' => 'DITIC',
        ]);

        Location::create([
            'cod_loc' => 'E02',
            'nam_loc' => 'Laboratorio de redes2',
        ]);
    }
}