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
        $ingresoFecha = $asset->income->date_inc;
        $currentYear = now()->year;
        $yearsRequired = [
            $ingresoFecha->year + 1,
            $ingresoFecha->year + 2,
            $ingresoFecha->year + 3
        ];

        // Recopilamos los años en los que se han realizado mantenimientos
        $maintenanceYears = [];
        foreach ($asset->maintenanceDetails as $maintenanceDetail) {
            $maintenance = $maintenanceDetail->maintenance;
            $maintenanceYears[] = date('Y', strtotime($maintenance->created_at));
        }

        // Aseguramos que los mantenimientos estén ordenados por año
        sort($maintenanceYears);

        // Verificamos si ya se cumplieron los 3 mantenimientos obligatorios
        if (
            count($maintenanceYears) === 3 &&
            $maintenanceYears === $yearsRequired
        ) {
            // Si se realizaron los mantenimientos en los 3 años obligatorios
            return 'cumplido';
        }

        // Si la fecha actual es posterior a 3 años después del ingreso
        if ($currentYear > $ingresoFecha->year + 3) {
            // Si no se ha cumplido con al menos un mantenimiento de los 3 años obligatorios
            if (count(array_diff($yearsRequired, $maintenanceYears)) > 0) {
                return 'inconcluso';
            }
        }

        // Si estamos dentro del periodo de 3 años y aún se pueden hacer los mantenimientos
        if ($currentYear <= $ingresoFecha->year + 3) {
            // Verificar si ya se ha cumplido al menos un mantenimiento en cada uno de los años requeridos
            $pendingYears = array_diff($yearsRequired, $maintenanceYears);

            // Si aún hay años pendientes, pero los años previos ya fueron realizados
            if (count($pendingYears) > 0 && count($maintenanceYears) > 0) {
                return 'en_proceso';
            }

            // Si no se han hecho mantenimientos en los años previos, se marca como inconcluso
            if (count($pendingYears) > 0) {
                return 'inconcluso';
            }
        }

        // En caso de que todo esté bien
        return 'cumplido';
    }
}
