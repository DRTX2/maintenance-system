<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaintenanceRequest;
use App\Models\Maintenance;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = Maintenance::all();
        return response()->json([
            "results" => $maintenances
        ], 200);
    }

    public function show($id)
    {
        $maintenance = Maintenance::fin($id);
        if (!$maintenance)
            return response()->json(["message" => "No existe el mantenimiento solicitado"], 404);

        return response()->json([
            "results" => $maintenance
        ], 200);
    }

    public function store(MaintenanceRequest $request)
    {
        try {
            $maintenance = Maintenance::create($request->validated());
            return response()->json([
                "message" => "Éxito al guardar el mantenimiento",
                "results" => $maintenance // luego quitarlo 
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error al guardar el mantenimiento",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function update(MaintenanceRequest $request, $id)
    {
        try {
            $maintenance = Maintenance::findOrFail($id);
            $validatedData = $request->validated();

            // $maintenance->update([
            //     "dni_res_main" => $validatedData['dni_res_main'],
            //     "cod_main" => $validatedData['cod_main'],
            //     "typ_main" => $validatedData['typ_main'],
            //     "created_at" => $validatedData['created_at'],
            //     "ended_at" => $validatedData['ended_at'],
            // ]);
            $maintenance->update($validatedData);

            return response()->json([
                "message" => "Mantenimiento actualizado"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Mantenimiento no encontrado",
                // "error"=>;
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error al actualizar el mantenimiento",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function hide($id)
    { // archivar 
        try {
            $maintenance = Maintenance::findOrFail($id);

            $maintenance->vis_main = "H";
            $maintenance->save();

            return response()->json([
                "message" => "Mantenimiento archivado"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Mantenimiento no encontrado",
                // "error"=>;
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error al actualizar el mantenimiento",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function search(Request $request)
    {
        $request->validate([
            "term" => 'required|max:10'
        ]);
        $term = $request->input('term');
        $maintenances = Maintenance::where('cod_main', 'LIKE', "%{$term}%")->get();

        return response()->json([
            'results' => $maintenances,
        ], 200);
    }
}
