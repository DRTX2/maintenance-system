<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivityRequest;
use App\Models\MaintenanceActivity;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

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
