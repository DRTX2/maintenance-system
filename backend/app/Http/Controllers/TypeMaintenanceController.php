<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceType;
use Illuminate\Http\Request;

class TypeMaintenanceController extends Controller
{
    public function index()
    {
        $data = MaintenanceType::all();
        return response()->json(["results" => $data, "message" => "Tipos de mantenimiento obtenidos con éxito"]);
    }

    public function show($id)
    {
        $tipo = MaintenanceType::find($id);

        if (!$tipo) {
            return response()->json(["results" => null, "message" => "Tipo de mantenimiento no encontrado"], 404);
        }

        return response()->json(["results" => $tipo, "message" => "Tipo de mantenimiento obtenido con éxito"]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'typ_main' => 'required|string|max:255',
        ]);

        $tipo = MaintenanceType::create($request->all());
        return response()->json(["results" => $tipo, "message" => "Tipo de mantenimiento creado con éxito"]);
    }

    public function update(Request $request, $id)
    {
        $tipo = MaintenanceType::find($id);

        if (!$tipo) {
            return response()->json(["results" => null, "message" => "Tipo de mantenimiento no encontrado"], 404);
        }

        $request->validate([
            'typ_main' => 'required|string|max:255',
        ]);

        $tipo->update($request->all());
        return response()->json(["results" => $tipo, "message" => "Tipo de mantenimiento actualizado con éxito"]);
    }

    public function destroy($id)
    {
        $tipo = MaintenanceType::find($id);

        if (!$tipo) {
            return response()->json(["results" => null, "message" => "Tipo de mantenimiento no encontrado"], 404);
        }

        $tipo->delete();
        return response()->json(["results" => null, "message" => "Tipo de mantenimiento eliminado con éxito"]);
    }
}
