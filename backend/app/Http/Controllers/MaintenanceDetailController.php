<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaintenanceDetailRequest;
use App\Models\Maintenance;
use App\Models\MaintenanceDetail;
use App\Models\Observation;
use App\Models\ReplacedComponent;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenanceDetailController extends Controller
{
    public function index($id)
    {
        $maintenanceDetail = Maintenance::with([
            'maintenanceDetails.asset',
            'maintenanceDetails.observations',
            'maintenanceDetails.activities',
            'maintenanceDetails.replacedComponents',
        ])
            ->find($id);

        if (!$maintenanceDetail) {
            return response()->json(["message" => "No existe el mantenimiento solicitado"], 404);
        }

        return response()->json([
            "results" => $maintenanceDetail,
        ], 200);
    }

    public function createMaintenanceWithDetails(MaintenanceDetailRequest $request)
    {
        $validatedData = $request->validated();

        DB::beginTransaction();

        try {
            $maintenance = Maintenance::create([
                'cod_main' => $validatedData['cod_main'],
                'id_typ_main' => $validatedData['id_typ_main'],
                'dni_res_main' => $validatedData['dni_res_main'],
            ]);

            if (!empty($validatedData['observations'])) {
                $observations = array_map(function ($observation) use ($maintenance) {
                    return [
                        'id_det_main_obs' => $maintenance->id,
                        'des_obs' => $observation['des_obs'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }, $validatedData['observations']);
                Observation::insert($observations);
            }

            if (!empty($validatedData['replaced_components'])) {
                $components = array_map(function ($component) use ($maintenance) {
                    return [
                        'id_det_main_bel' => $maintenance->id,
                        'id_com_bel' => $component['id_com_bel'],
                        'des_rep_com' => $component['des_rep_com'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }, $validatedData['replaced_components']);
                ReplacedComponent::insert($components);
            }

            if (!empty($validatedData['activities'])) {
                $activities = array_map(function ($activityId) use ($maintenance) {
                    return [
                        'id_main' => $maintenance->id, // Relación con el mantenimiento
                        'id_act' => $activityId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }, $validatedData['activities']);
                DB::table('activity_maintenance_details')->insert($activities);
            }

            DB::commit();

            return response()->json([
                'message' => 'Mantenimiento creado exitosamente.',
                'results' => $maintenance,
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear el mantenimiento.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateMaintenanceWithDetails(MaintenanceDetailRequest $request, $id)
    {
        $validatedData = $request->validated();

        DB::beginTransaction();

        try {
            $maintenance = Maintenance::findOrFail($id);

            $maintenance->update([
                'cod_main' => $validatedData['cod_main'],
                'id_typ_main' => $validatedData['id_typ_main'],
                'dni_res_main' => $validatedData['dni_res_main'],
            ]);

            // Sincronizar observaciones ??
            $this->syncObservations($maintenance->id, $validatedData['observations'] ?? []);

            // Sincronizar componentes reemplazados
            $this->syncReplacedComponents($maintenance->id, $validatedData['replaced_components'] ?? []);

            // Sincronizar actividades
            $this->syncActivities($maintenance->id, $validatedData['activities'] ?? []);

            DB::commit();

            return response()->json([
                'message' => 'Mantenimiento actualizado exitosamente.',
                'results' => $maintenance,
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar el mantenimiento.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    protected function syncObservations($maintenanceId, array $observations)
    {
        $existingObservations = Observation::where('id_det_main_obs', $maintenanceId)->get();

        // Crear un mapa de observaciones existentes para facilitar la búsqueda
        $existingMap = $existingObservations->keyBy('id');

        // Procesar nuevas observaciones
        foreach ($observations as $observation) {
            if (isset($observation['id']) && $existingMap->has($observation['id'])) {
                // Actualizar si existe
                $existingMap[$observation['id']]->update([
                    'des_obs' => $observation['des_obs'],
                ]);
                $existingMap->forget($observation['id']); // Marcar como procesada
            } else {
                // Crear nueva observación
                Observation::create([
                    'id_det_main_obs' => $maintenanceId,
                    'des_obs' => $observation['des_obs'],
                ]);
            }
        }

        // Eliminar las observaciones restantes no procesadas
        Observation::whereIn('id', $existingMap->keys())->delete();
    }
    protected function syncReplacedComponents($maintenanceId, array $components)
    {
        $existingComponents = ReplacedComponent::where('id_det_main_bel', $maintenanceId)->get();

        $existingMap = $existingComponents->keyBy('id');

        foreach ($components as $component) {
            if (isset($component['id']) && $existingMap->has($component['id'])) {
                // Actualizar si existe
                $existingMap[$component['id']]->update([
                    'id_com_bel' => $component['id_com_bel'],
                    'des_rep_com' => $component['des_rep_com'],
                ]);
                $existingMap->forget($component['id']);
            } else {
                // Crear nuevo componente reemplazado
                ReplacedComponent::create([
                    'id_det_main_bel' => $maintenanceId,
                    'id_com_bel' => $component['id_com_bel'],
                    'des_rep_com' => $component['des_rep_com'],
                ]);
            }
        }

        // Eliminar componentes restantes no procesados
        ReplacedComponent::whereIn('id', $existingMap->keys())->delete();
    }
    protected function syncActivities($maintenanceId, array $activities)
    {
        $existingActivities = DB::table('activity_maintenance_details')
            ->where('id_main', $maintenanceId)
            ->pluck('id_act')
            ->toArray();

        $newActivities = collect($activities);

        // Actividades a añadir
        $toAdd = $newActivities->diff($existingActivities)->all();

        // Actividades a eliminar
        $toRemove = collect($existingActivities)->diff($newActivities)->all();

        // Insertar nuevas actividades
        foreach ($toAdd as $activityId) {
            DB::table('activity_maintenance_details')->insert([
                'id_main' => $maintenanceId,
                'id_act' => $activityId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Eliminar actividades sobrantes
        DB::table('activity_maintenance_details')
            ->where('id_main', $maintenanceId)
            ->whereIn('id_act', $toRemove)
            ->delete();
    }
}
