<?php

namespace Database\Seeders;

use App\Models\Maintenance;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        Maintenance::create([
            'dni_res_main' => '1850656065', // Asegúrate que el DNI del responsable exista
            'cod_main'     => 'MA-001',
            'id_typ_main'  => 1, // Asegúrate que el ID del tipo de mantenimiento exista (por ejemplo, '1' es un tipo válido)
            'vis_main'     => 'V', // Visible
            'created_at'   => Carbon::now(),
            'ended_at'     => null, // Si no se ha finalizado aún
        ]);

        Maintenance::create([
            'dni_res_main' => '1850656066',
            'cod_main'     => 'MA-002',
            'id_typ_main'  => 2,
            'vis_main'     => 'H', // Hidden
            'created_at'   => Carbon::now(),
            'ended_at'     => Carbon::now()->addDays(10),
        ]);

        Maintenance::create([
            'dni_res_main' => '1850656067',
            'cod_main'     => 'MA-003',
            'id_typ_main'  => 3,
            'vis_main'     => 'V',
            'created_at'   => Carbon::now(),
            'ended_at'     => null,
        ]);

        Maintenance::create([
            'dni_res_main' => '1850656068',
            'cod_main'     => 'MA-004',
            'id_typ_main'  => 4,
            'vis_main'     => 'H',
            'created_at'   => Carbon::now(),
            'ended_at'     => Carbon::now()->addDays(15),
        ]);
    }
}
