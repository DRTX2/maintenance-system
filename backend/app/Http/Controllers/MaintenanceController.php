<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaintenanceRequest;
use App\Models\Maintenance;
use App\Models\MaintenanceDetail;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = Maintenance::with(['maintenanceType:id,typ_main', 'responsible:id,dni_res,nam_res,las_res'])
        ->get()
        ->map(function ($maintenance) {
            return [
                'id' => $maintenance->id,
                'cod_main' => $maintenance->cod_main,
                'vis_main' => $maintenance->vis_main,
                'responsable' => $maintenance->responsible->nam_res . ' ' . $maintenance->responsible->las_res, // Concatenar el nombre y apellido
                'type' => $maintenance->maintenanceType->typ_main, // Nombre del tipo de mantenimiento
            ];
        });
        return response()->json([
            "results" => $maintenances
        ], 200);
    }

    public function show($id)
    {
        $maintenance = Maintenance::with(['maintenanceType:id,typ_main', 'responsible:id,dni_res,nam_res,las_res'])->find($id);
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
            $maintenanceDetail = new MaintenanceDetail();
            $maintenanceDetail->id_main_bel = $maintenance->id;
            $maintenanceDetail->id_ass_bel = null;
            $maintenanceDetail->save();

            return response()->json([
                "results" => $maintenance,
                "detaiul"=>$maintenanceDetail
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
