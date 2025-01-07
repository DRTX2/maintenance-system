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
                    'dni_res_main' => '1850656075',
                    'cod_main'     => 'MA-001',
                    'id_typ_main'  => 1,
                    'vis_main'     => 'V',
                    'created_at'   => Carbon::now(),
                    'ended_at'     => null,
                    'details'      => [
                        [
                            'id_ass_bel' => 1, // ID del activo relacionado
                            'observations' => [
                                ['des_obs' => 'Primera observación del activo 1'],
                                ['des_obs' => 'Segunda observación del activo 1'],
                            ],
                            'replaced_components' => [
                                ['id_com_bel' => 1, 'des_rep_com' => 'Componente A reemplazado'],
                                ['id_com_bel' => 2, 'des_rep_com' => 'Componente B reemplazado'],
                            ],
                            'activities' => [1, 2],
                        ],
                    ],
                ],
                [
                    'dni_res_main' => '1850656075',
                    'cod_main'     => 'MA-002',
                    'id_typ_main'  => 2,
                    'vis_main'     => 'H',
                    'created_at'   => Carbon::now(),
                    'ended_at'     => Carbon::now()->addDays(10),
                    'details'      => [
                        [
                            'id_ass_bel' => 2,
                            'observations' => [
                                ['des_obs' => 'Observación del activo 2'],
                            ],
                            'replaced_components' => [],
                            'activities' => [3],
                        ],
                    ],
                ],
            ];

            foreach ($maintenances as $maintenanceData) {
                $maintenance = Maintenance::create([
                    'dni_res_main' => $maintenanceData['dni_res_main'],
                    'cod_main'     => $maintenanceData['cod_main'],
                    'id_typ_main'  => $maintenanceData['id_typ_main'],
                    'vis_main'     => $maintenanceData['vis_main'],
                    'created_at'   => $maintenanceData['created_at'],
                    'ended_at'     => $maintenanceData['ended_at'],
                ]);

                foreach ($maintenanceData['details'] as $detailData) {
                    $maintenanceDetail = MaintenanceDetail::create([
                        'id_main_bel' => $maintenance->id,
                        'id_ass_bel'  => $detailData['id_ass_bel'],
                    ]);

                    if (!empty($detailData['observations'])) {
                        foreach ($detailData['observations'] as $observation) {
                            Observation::create([
                                'id_det_main_obs' => $maintenanceDetail->id,
                                'des_obs'         => $observation['des_obs'],
                            ]);
                        }
                    }

                    if (!empty($detailData['replaced_components'])) {
                        foreach ($detailData['replaced_components'] as $component) {
                            ReplacedComponent::create([
                                'id_det_main_bel' => $maintenanceDetail->id,
                                'id_com_bel'      => $component['id_com_bel'],
                                'des_rep_com'     => $component['des_rep_com'],
                            ]);
                        }
                    }

                    if (!empty($detailData['activities'])) {
                        foreach ($detailData['activities'] as $activityId) {
                            DB::table('activity_maintenance_details')->insert([
                                'id_main'    => $maintenanceDetail->id,
                                'id_act'     => $activityId,
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
