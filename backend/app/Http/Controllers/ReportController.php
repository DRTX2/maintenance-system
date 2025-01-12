<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Maintenance;
use App\Services\MaintenanceResponseService;
use Exception;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    protected $maintenanceReportService;

    public function __construct(MaintenanceResponseService $maintenanceResponseService)
    {
        $this->maintenanceReportService = $maintenanceResponseService;
    }

    public function filterByResponsibleAndTime(Request $request)
    {

        $request->validate([
            "responsible" => 'required|exists:responsibles,dni_res',
            "created_at" => 'required|date',
            "ended_at" => 'required|date|after_or_equal:created_at',
        ]);

        $maintenances = Maintenance::query();

        if ($request->has('responsible') && $request->input('responsible')) {
            $maintenances->where('dni_res_main', $request->input('responsible'));
        }

        if ($request->has('created_at') && $request->has('ended_at')) {
            $maintenances->whereBetween('created_at', [
                $request->input('created_at'),
                $request->input('ended_at')
            ]);
        }

        $maintenances = $this->maintenanceReportService->loadRelations($maintenances)->get();

        $transformedMaintenances = $this->maintenanceReportService->transformMaintenances($maintenances);

        return response()->json([
            'results' => $transformedMaintenances
        ], 200);
    }

    public function filterByAsset(Request $request)
    {

        $request->validate([
            "asset" => 'required|exists:assets,id',
        ]);

        $maintenances = Maintenance::query();

        if ($request->has('asset') && $request->input('asset')) {
            $maintenances->whereHas('maintenanceDetails.asset', function ($query) use ($request) {
                $query->where('id', $request->input('asset'));
            });
        }

        $maintenances = $this->maintenanceReportService->loadRelations($maintenances)->get();

        $transformedMaintenances = $this->maintenanceReportService->transformMaintenances($maintenances);

        return response()->json([
            'results' => $transformedMaintenances
        ], 200);
    }

    public function maintenancesToAssets()
    {
        try {
            $assets = Asset::with(['maintenanceDetails.maintenance' => function ($query) {
                $query->orderBy('created_at');  // Ordenar por fecha de creación si es necesario
            }])->get();

            // Inicializar un array para el reporte
            $report = [
                'desde' => now()->format('d/m/Y'), // Fecha actual como ejemplo, tocaria poner la del menor ingreso creo
                'assets' => []
            ];

            // Recorrer los activos y agrupar los mantenimientos por estado
            foreach ($assets as $asset) {
                $cumplidos = [];
                $en_proceso = [];
                $inconclusos = [];

                // Recorrer los detalles de mantenimiento de cada activo
                $maintenanceYears = [];

                foreach ($asset->maintenanceDetails as $maintenanceDetail) {
                    $maintenance = $maintenanceDetail->maintenance;
                    $years = [date('Y', strtotime($maintenance->created_at))];

                    $maintenanceYears[] = $years[0];

                    $status = $this->determineMaintenanceStatus($asset);

                    // Agrupar según el estado
                    $maintenanceData = ['años' => $years];

                    switch ($status) {
                        case 'cumplido':
                            $cumplidos[] = $maintenanceData;
                            break;
                        case 'en_proceso':
                            $en_proceso[] = $maintenanceData;
                            break;
                        case 'inconcluso':
                            $inconclusos[] = $maintenanceData;
                            break;
                        default:
                            break;
                    }
                }

                // Agregar el activo al reporte
                $report['assets'][] = [
                    'id' => $asset->id,
                    'codigo' => $asset->cod_ass,
                    'serie' => $asset->ser_num_ass,
                    'mantenimientos' => [
                        'cumplidos' => $cumplidos,
                        'en_proceso' => $en_proceso,
                        'inconclusos' => $inconclusos,
                    ],
                ];
            }

            return response()->json($report, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al generar el reporte',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function determineMaintenanceStatus($asset)
    {
        $currentYear = now()->year;
        $ingresoFecha = $asset->income->date_inc; // Fecha de ingreso del activo
        $yearsRequired = [
            $ingresoFecha->year + 1,
            $ingresoFecha->year + 2,
            $ingresoFecha->year + 3
        ];

        // Recopilar los años de mantenimiento realizados
        $maintenanceYears = [];
        foreach ($asset->maintenanceDetails as $maintenanceDetail) {
            $maintenanceYears[] = date('Y', strtotime($maintenanceDetail->maintenance->created_at));
        }

        // Lógica de determinación del estado como se discutió antes
        if (count($maintenanceYears) === 3 && $maintenanceYears === $yearsRequired) {
            return 'cumplido';
        }

        // Evaluar el estado "en proceso" o "inconcluso" basado en los años
        if ($currentYear <= $ingresoFecha->year + 3) {
            $pendingYears = array_diff($yearsRequired, $maintenanceYears);
            return count($pendingYears) > 0 ? 'en_proceso' : 'inconcluso';
        }

        return 'inconcluso';
    }
}
