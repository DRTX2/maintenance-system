<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivityRequest;
use App\Models\MaintenanceActivity;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = MaintenanceActivity::all();
        return response()->json([
            "results" => $activities
        ], 200);
    }

    public function show($id)
    {
        $activity = MaintenanceActivity::find($id);
        if (!$activity) {
            return response()->json(
                ["message" => "Actividad solicitada inexistente"],
                404
            );
        }

        return response()->json([
            "results" => $activity
        ], 200);
    }

    public function store(ActivityRequest $request)
    {
        try {
            $activity = MaintenanceActivity::create($request->validated());
            return response()->json([
                "results" => $activity
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function addActivitiesToMaintenanceDetail(Request $request)
    {
        $validatedData = $request->validate([
            'id_main' => 'required|exists:maintenance_details,id',
            'activities' => 'required|array',
            'activities.*' => 'exists:activities,id',
        ]);

        $idMain = $validatedData['id_main'];
        $activityIds = $validatedData['activities'];

        // Insertar múltiples registros en activity_maintenance_details
        $data = array_map(function ($activityId) use ($idMain) {
            return [
                'id_main' => $idMain,
                'id_act' => $activityId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $activityIds);

        DB::beginTransaction();
        try {
            DB::table('activity_maintenance_details')->insert($data);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al agregar actividades', 'error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Activities added successfully.'], 201);
    }

    public function update(ActivityRequest $request, $id)
    {
        try {
            $activity = MaintenanceActivity::findOrFail($id);
            $validatedData = $request->validated();

            $activity->update($validatedData);

            return response()->json([
                "message" => "Actividad actualizada con éxito"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Actividad no encontrada",
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error al actualizar la actividad",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $activity = MaintenanceActivity::find($id);

        if (!$activity) {
            return response()->json(["message" => "Actividad no encontrada"], 404);
        }

        $activity->delete();

        return response()->json(["message" => "Actividad borrada con éxito"], 200);
    }

    public function search(Request $request)
    {
        $request->validate([
            "term" => 'required|string|max:255'
        ]);

        $term = $request->input('term');
        $activities = MaintenanceActivity::where('act_main', 'LIKE', "%{$term}%")->get();

        return response()->json([
            'results' => $activities,
        ], 200);
    }
}
