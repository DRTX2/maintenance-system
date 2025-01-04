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
                    'responsable' => $maintenance->responsible->nam_res . ' ' . $maintenance->responsible->las_res,
                    'type' => $maintenance->maintenanceType->typ_main,
                ];
            });
        return response()->json([
            "results" => $maintenances
        ], 200);
    }

    public function show($id)
    {
        $maintenance = Maintenance::with([
            'responsible',
            'maintenanceType',
            'maintenanceDetails.asset',
            'maintenanceDetails.observations',
            'maintenanceDetails.activities',
            'maintenanceDetails.replacedComponents',
        ])->find($id);

        if (!$maintenance) {
            return response()->json(["message" => "No existe el mantenimiento solicitado"], 404);
        }

        // Obtener datos del responsable
        $responsibleFullName = $maintenance->responsible
            ? $maintenance->responsible->nam_res . ' ' . $maintenance->responsible->las_res
            : "Responsable no definido";
        $isExtern = $maintenance->responsible->is_ext === "Y" ? "Externo" : "Interno";
        // Obtener datos del tipo de mantenimiento
        $maintenanceTypeName = $maintenance->maintenanceType->typ_main ?? "Tipo de mantenimiento no definido";

        // Transformar los detalles del mantenimiento
        $details = $maintenance->maintenanceDetails->map(function ($detail) {
            return [
                "id_det_main" => $detail->id,
                "asset" => [
                    "id" => $detail->asset->id,
                    "cod_ass" => $detail->asset->cod_ass,
                    "ser_num_ass" => $detail->asset->ser_num_ass,
                    "obs_add_ass" => $detail->asset->obs_add_ass,
                    "est_ass" => $detail->asset->est_ass,
                    "observations" => $detail->observations->map(function ($observation) {
                        return [
                            "id" => $observation->id,
                            "des_obs" => $observation->des_obs,
                        ];
                    }),
                    "replaced_components" => $detail->replacedComponents->map(function ($component) {
                        return [
                            "id" => $component->id,
                            "id_com_bel" => $component->id_com_bel,
                            "des_rep_com" => $component->des_rep_com,
                        ];
                    }),
                    "activities" => $detail->activities->map(function ($activity) {
                        return [
                            "id" => $activity->id,
                            "act_main" => $activity->act_main,
                        ];
                    }),
                ],
            ];
        });

        $response = [
            "id_main" => $maintenance->id,
            "cod_main" => $maintenance->cod_main,
            "id_typ_main" => $maintenance->id_typ_main,
            "typ_main_name" => $maintenanceTypeName,
            "dni_res_main" => $maintenance->dni_res_main,
            "responsible_name" => $responsibleFullName,
            "is_ext" => $isExtern,
            "vis_main" => $maintenance->vis_main,
            "ended_at" => $maintenance->ended_at,
            "created_at" => $maintenance->created_at,
            "details" => $details,
        ];

        return response()->json([
            "results" => $response,
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
                "detaiul" => $maintenanceDetail
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

            // Alterna el estado de vis_main
            $maintenance->vis_main = $maintenance->vis_main === "V" ? "H" : "V";
            $maintenance->save();

            $message = $maintenance->vis_main === "V"
                ? "Mantenimiento ahora está visible"
                : "Mantenimiento archivado";

            return response()->json([
                "message" => $message,
                "status" => $maintenance->vis_main,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Mantenimiento no encontrado",
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
