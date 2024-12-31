<?php

namespace Database\Seeders;

use App\Models\Responsible;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResponsibleSeeder extends Seeder
{
    
    public function run(): void
    {
        Responsible::create([
            'dni_res' => '1850656075',
            'nam_res' => 'Juan',
            'las_res' => 'Perez',
            'ema_res' => 'juan.perez@example.com',
            'pho_res' => '3001234567',
            'is_ext'  => 'N',
        ]);

        Responsible::create([
            'dni_res' => '1850656076',
            'nam_res' => 'Maria',
            'las_res' => 'Gomez',
            'ema_res' => 'maria.gomez@example.com',
            'pho_res' => '3001234568',
            'is_ext'  => 'N',
        ]);

        Responsible::create([
            'dni_res' => '1850656077',
            'nam_res' => 'Carlos',
            'las_res' => 'Lopez',
            'ema_res' => 'carlos.lopez@example.com',
            'pho_res' => '3001234569',
            'is_ext'  => 'Y',
        ]);

        Responsible::create([
            'dni_res' => '1850656078',
            'nam_res' => 'Laura',
            'las_res' => 'Martinez',
            'ema_res' => 'laura.martinez@example.com',
            'pho_res' => '3001234570',
            'is_ext'  => 'Y',
        ]);
    }
}
