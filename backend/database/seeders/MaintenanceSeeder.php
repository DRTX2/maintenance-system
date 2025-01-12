<?php

namespace Database\Seeders;

use App\Models\Maintenance;
use App\Models\MaintenanceDetail;
use App\Models\Observation;
use App\Models\ReplacedComponent;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaintenanceSeeder extends Seeder
{
    public function run()
    {
        DB::transaction(function () {


            $maintenances = [
                [
                    'dni_res_main' => '1724567890',
                    'cod_main' => 'MA-101',
                    'id_typ_main' => 1,
                    'vis_main' => 'V',
                    'created_at' => Carbon::now()->subDays(5), // Creado hace 5 días
                    'ended_at' => Carbon::now()->subDays(1),
                    'details' => [
                        [
                            'id_ass_bel' => 1, // ID del activo relacionado
                            'observations' => [
                                ['des_obs' => 'El ventilador no funciona correctamente.'],
                                ['des_obs' => 'Se observan piezas desgastadas.'],
                            ],
                            'replaced_components' => [
                                ['id_com_bel' => 5, 'des_rep_com' => 'Ventilador reemplazado por modelo X.'],
                                ['id_com_bel' => 6, 'des_rep_com' => 'Cableado interno actualizado.'],
                            ],
                            'activities' => [1, 4], // IDs de las actividades realizadas
                        ],
                    ],
                ],
                [
                    'dni_res_main' => '1721234567',
                    'cod_main' => 'MA-102',
                    'id_typ_main' => 2,
                    'vis_main' => 'H',
                    'created_at' => Carbon::now()->subDays(15), // Creado hace 15 días
                    'ended_at' => Carbon::now()->subDays(10), // Finalizado hace 10 días
                    'details' => [
                        [
                            'id_ass_bel' => 2, // ID del activo relacionado
                            'observations' => [
                                ['des_obs' => 'Fallas detectadas en el software de control.'],
                            ],
                            'replaced_components' => [
                                ['id_com_bel' => 7, 'des_rep_com' => 'Tarjeta madre sustituida.'],
                            ],
                            'activities' => [2, 5], // IDs de las actividades realizadas
                        ],
                    ],
                ],
                [
                    'dni_res_main' => '1724567890',
                    'cod_main' => 'MA-003',
                    'id_typ_main' => 1,
                    'vis_main' => 'V',
                    'created_at' => Carbon::now()->subYears(3)->addMonths(3), // Hace 3 años y 3 meses
                    'ended_at' => Carbon::now()->subYears(3)->addMonths(3)->addDays(5), // Finalizado en 5 días
                    'details' => [
                        [
                            'id_ass_bel' => 5, // Relación con ASSET001
                            'observations' => [
                                ['des_obs' => 'Cambio de ventilador necesario.'],
                            ],
                            'replaced_components' => [
                                ['id_com_bel' => 5, 'des_rep_com' => 'Ventilador reemplazado.'],
                            ],
                            'activities' => [1], // IDs de actividades realizadas
                        ],
                    ],
                ],
                [
                    'dni_res_main' => '1721234567',
                    'cod_main' => 'MA-004',
                    'id_typ_main' => 2,
                    'vis_main' => 'H',
                    'created_at' => Carbon::now()->subYears(2), // Hace 2 años
                    'ended_at' => Carbon::now()->subYears(2)->addDays(7), // Finalizado en 7 días
                    'details' => [
                        [
                            'id_ass_bel' => 6, // Relación con ASSET002
                            'observations' => [
                                ['des_obs' => 'Falla en el sistema eléctrico.'],
                            ],
                            'replaced_components' => [],
                            'activities' => [3], // IDs de actividades realizadas
                        ],
                    ],
                ],
            ];

            foreach ($maintenances as $maintenanceData) {
                $maintenance = Maintenance::create([
                    'dni_res_main' => $maintenanceData['dni_res_main'],
                    'cod_main' => $maintenanceData['cod_main'],
                    'id_typ_main' => $maintenanceData['id_typ_main'],
                    'vis_main' => $maintenanceData['vis_main'],
                    'created_at' => $maintenanceData['created_at'],
                    'ended_at' => $maintenanceData['ended_at'],
                ]);

                foreach ($maintenanceData['details'] as $detailData) {
                    $maintenanceDetail = MaintenanceDetail::create([
                        'id_main_bel' => $maintenance->id,
                        'id_ass_bel' => $detailData['id_ass_bel'],
                    ]);

                    if (!empty($detailData['observations'])) {
                        foreach ($detailData['observations'] as $observation) {
                            Observation::create([
                                'id_det_main_obs' => $maintenanceDetail->id,
                                'des_obs' => $observation['des_obs'],
                            ]);
                        }
                    }

                    if (!empty($detailData['replaced_components'])) {
                        foreach ($detailData['replaced_components'] as $component) {
                            ReplacedComponent::create([
                                'id_det_main_bel' => $maintenanceDetail->id,
                                'id_com_bel' => $component['id_com_bel'],
                                'des_rep_com' => $component['des_rep_com'],
                            ]);
                        }
                    }

                    if (!empty($detailData['activities'])) {
                        foreach ($detailData['activities'] as $activityId) {
                            DB::table('activity_maintenance_details')->insert([
                                'id_main' => $maintenanceDetail->id,
                                'id_act' => $activityId,
                                'created_at' => Carbon::now(),
                                'updated_at' => Carbon::now(),
                            ]);
                        }
                    }
                }
            }
        });
    }
}