<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceActivity;
use Illuminate\Http\Request;

class MaintenanceActivityController extends Controller
{
    public function index()
    {
        $data = MaintenanceActivity::with('maintenanceType')->get();
        return response()->json(["results" => $data, "message" => "Actividades de mantenimiento obtenidas con éxito"]);
    }

    public function show($id)
    {
        $actividad = MaintenanceActivity::with('maintenanceType')->find($id);

        if (!$actividad) {
            return response()->json(["results" => null, "message" => "Actividad de mantenimiento no encontrada"], 404);
        }

        return response()->json(["results" => $actividad, "message" => "Actividad de mantenimiento obtenida con éxito"]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'typ_main_id' => 'required|exists:type_maintenances,id',
            'act_main' => 'required|string|max:255',
        ]);

        $actividad = MaintenanceActivity::create($request->all());
        return response()->json(["results" => $actividad, "message" => "Actividad de mantenimiento creada con éxito"]);
    }

    public function update(Request $request, $id)
    {
        $actividad = MaintenanceActivity::find($id);

        if (!$actividad) {
            return response()->json(["results" => null, "message" => "Actividad de mantenimiento no encontrada"], 404);
        }

        $request->validate([
            'typ_main_id' => 'required|exists:tipos_mantenimiento,id',
            'act_main' => 'required|string|max:255',
        ]);

        $actividad->update($request->all());
        return response()->json(["results" => $actividad, "message" => "Actividad de mantenimiento actualizada con éxito"]);
    }

    public function destroy($id)
    {
        $actividad = MaintenanceActivity::find($id);

        if (!$actividad) {
            return response()->json(["results" => null, "message" => "Actividad de mantenimiento no encontrada"], 404);
        }

        $actividad->delete();
        return response()->json(["results" => null, "message" => "Actividad de mantenimiento eliminada con éxito"]);
    }
}
