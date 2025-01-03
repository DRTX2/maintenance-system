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
use Illuminate\Validation\ValidationException;

class MaintenanceDetailController extends Controller
{
    public function index()
    {
        $maintenanceDetails = MaintenanceDetail::with([
            'maintenance',
            'asset',
            'observations',
            'activities',
            'replacedComponents',
        ])
            ->get();

        if (!$maintenanceDetails) {
            return response()->json(["message" => "No existe el mantenimiento solicitado"], 404);
        }

        return response()->json([
            "results" => $maintenanceDetails,
        ], 200);
    }

    public function show($id)
    {
        $maintenanceDetail = MaintenanceDetail::with([
            'maintenance',
            'asset',
            'observations',
            'activities',
            'replacedComponents',
        ])
            ->find($id);

        if (!$maintenanceDetail) {
            return response()->json(["message" => "No existe el mantenimiento solicitado"], 404);
        }

        return response()->json([
            "results" => $maintenanceDetail,
        ], 200);
    }

    public function store(MaintenanceDetailRequest $request)
    {
        $validatedData = $request->validated();

        DB::beginTransaction();

        try {
            // Crear el mantenimiento principal
            $maintenance = Maintenance::create([
                'cod_main' => $validatedData['cod_main'],
                'id_typ_main' => $validatedData['id_typ_main'],
                'dni_res_main' => $validatedData['dni_res_main'],
                'vis_main' => $validatedData['vis_main'] ?? 'V',
                'ended_at' => $validatedData['ended_at'] ?? null,
                'created_at' => $validatedData['created_at'],
            ]);

            foreach ($validatedData['assets'] as $asset) {
                $maintenanceDetail = new MaintenanceDetail();
                $maintenanceDetail->id_main_bel = $maintenance->id;
                $maintenanceDetail->id_ass_bel= $asset['id'];
                $maintenanceDetail->save();

                if (!$maintenanceDetail->id) {
                    throw new Exception("Error al crear el detalle de mantenimiento para un asset.");
                }

                if (!empty($asset['observations'])) {
                    $observations = array_map(function ($observation) use ($maintenanceDetail) {
                        return [
                            'id_det_main_obs' => $maintenanceDetail->id,
                            'des_obs' => $observation['des_obs'],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }, $asset['observations']);
                    Observation::insert($observations);
                }

                if (!empty($asset['replaced_components'])) {
                    $components = array_map(function ($component) use ($maintenanceDetail) {
                        return [
                            'id_det_main_bel' => $maintenanceDetail->id,
                            'id_com_bel' => $component['id_com_bel'],
                            'des_rep_com' => $component['des_rep_com'],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }, $asset['replaced_components']);
                    ReplacedComponent::insert($components);
                }

                if (!empty($asset['activities'])) {
                    $activities = array_map(function ($activityId) use ($maintenanceDetail) {
                        return [
                            'id_main' => $maintenanceDetail->id,
                            'id_act' => $activityId,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }, $asset['activities']);
                    DB::table('activity_maintenance_details')->insert($activities);
                }
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

    public function update(MaintenanceDetailRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();
            // Lógica de actualización
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el mantenimiento.',
                'error' => $e->getMessage(),
            ], 500);
        }

        DB::beginTransaction();

        try {
            $maintenance = Maintenance::findOrFail($id);

            $maintenance->update([
                'cod_main' => $validatedData['cod_main'],
                'id_typ_main' => $validatedData['id_typ_main'],
                'dni_res_main' => $validatedData['dni_res_main'],
                'vis_main' => $validatedData['vis_main'] ?? 'V',
                'ended_at' => $validatedData['ended_at'] ?? null,
            ]);

            $maintenanceDetail = MaintenanceDetail::where('id_main_bel', $maintenance->id)->firstOrFail();

            $this->syncObservations($maintenanceDetail->id, $validatedData['observations'] ?? []);

            $this->syncReplacedComponents($maintenanceDetail->id, $validatedData['replaced_components'] ?? []);

            $this->syncActivities($maintenanceDetail->id, $validatedData['activities'] ?? []);

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
        // Obtener las observaciones existentes
        $existingObservations = Observation::where('id_det_main_obs', $maintenanceId)->get();

        // Crear un mapa de observaciones existentes
        $existingMap = $existingObservations->keyBy('id');

        // Crear/Actualizar las observaciones que ya existen o agregar nuevas
        foreach ($observations as $observation) {
            if (isset($observation['id']) && $existingMap->has($observation['id'])) {
                // Actualizar la observación si existe
                $existingMap[$observation['id']]->update([
                    'des_obs' => $observation['des_obs'],
                ]);
                $existingMap->forget($observation['id']); // Marcar como procesada
            } else {
                // Crear nueva observación si no existe
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
        // Obtener los componentes existentes
        $existingComponents = ReplacedComponent::where('id_det_main_bel', $maintenanceId)->get();

        // Crear un mapa de componentes existentes
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
                // Crear nuevo componente si no existe
                ReplacedComponent::create([
                    'id_det_main_bel' => $maintenanceId,
                    'id_com_bel' => $component['id_com_bel'],
                    'des_rep_com' => $component['des_rep_com'],
                ]);
            }
        }

        // Eliminar los componentes no procesados
        ReplacedComponent::whereIn('id', $existingMap->keys())->delete();
    }

    protected function syncActivities($maintenanceDetailId, array $activities)
    {
        $existingActivities = DB::table('activity_maintenance_details')
            ->where('id_main', $maintenanceDetailId)
            ->pluck('id_act')
            ->toArray();

        $newActivities = collect($activities);

        // Determinar actividades a añadir y eliminar
        $toAdd = $newActivities->diff($existingActivities)->all();
        $toRemove = collect($existingActivities)->diff($newActivities)->all();

        // Insertar nuevas actividades
        foreach ($toAdd as $activityId) {
            DB::table('activity_maintenance_details')->insert([
                'id_main' => $maintenanceDetailId,
                'id_act' => $activityId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Eliminar actividades sobrantes
        DB::table('activity_maintenance_details')
            ->where('id_main', $maintenanceDetailId)
            ->whereIn('id_act', $toRemove)
            ->delete();
    }
}
