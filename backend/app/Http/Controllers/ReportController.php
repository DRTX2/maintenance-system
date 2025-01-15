<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Maintenance;
use App\Services\MaintenanceResponseService;
use Carbon\Carbon;
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

        $asset = Asset::with('income:id,cod_inc')->find($request->input('asset'));
        $maintenances = Maintenance::query();

        if ($request->has('asset') && $request->input('asset')) {
            $maintenances->whereHas('maintenanceDetails.asset', function ($query) use ($request) {
                $query->where('id', $request->input('asset'));
            });
        }

        $maintenances = $this->maintenanceReportService->loadRelations($maintenances)->get();

        $transformedMaintenances = $this->maintenanceReportService->transformForSpecificAsset($maintenances, $request->input('asset'));

        return response()->json([
            'id' => $asset->id,
            'cod_ass' => $asset->cod_ass,
            'income' => $asset->income,
            'ser_num_ass' => $asset->ser_num_ass,
            'maintenances' => $transformedMaintenances
        ], 200);
    }

    public function maintenancesToAssets()
    {
        try {
            $assets = Asset::with('maintenanceDetails.maintenance', 'income')->get();

            $report = [
                'desde' => now()->format('d/m/Y'),
                'assets' => []
            ];

            foreach ($assets as $asset) {
                $status = $this->determineMaintenanceStatus($asset);

                $cumplidos = [];
                $en_proceso = [];
                $inconclusos = [];

                foreach ($status as $year => $state) {
                    $maintenanceData = ['años' => [$year]];
                    switch ($state) {
                        case 'cumplido':
                            $cumplidos[] = $maintenanceData;
                            break;
                        case 'en_proceso':
                            $en_proceso[] = $maintenanceData;
                            break;
                        case 'inconcluso':
                            $inconclusos[] = $maintenanceData;
                            break;
                    }
                }

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
        $ingresoFecha = Carbon::parse($asset->income->date_inc); // Convertir a Carbon para manejar fechas
        $yearsRequired = [
            $ingresoFecha->year + 1,
            $ingresoFecha->year + 2,
            $ingresoFecha->year + 3,
        ];

        // Recopilar los años de mantenimiento realizados
        $maintenanceYears = [];
        foreach ($asset->maintenanceDetails as $maintenanceDetail) {
            $maintenanceYears[] = (int) date('Y', strtotime($maintenanceDetail->maintenance->created_at));
        }
        $maintenanceYears = array_unique($maintenanceYears); // Eliminar duplicados

        // Verificar cada año requerido
        $status = [];
        foreach ($yearsRequired as $year) {
            if (in_array($year, $maintenanceYears)) {
                $status[$year] = 'cumplido'; // El mantenimiento se realizó en este año
            } elseif ($year < $currentYear) {
                $status[$year] = 'inconcluso'; // Este año ya pasó y no hay mantenimiento registrado
            } else {
                $status[$year] = 'en_proceso'; // Este año está en curso o aún no ha llegado
            }
        }

        return $status;
    }


    public function maintenancesToAssetsFormated()
    {
        try {
            $assets = Asset::with(['maintenanceDetails.maintenance'])->get();

            // Inicializar el reporte
            $report = [
                'desde' => now()->format('01/01/Y'), // Fecha de inicio
                'cumplidos' => [],
                'en_proceso' => [],
                'inconclusos' => [],
            ];

            // Recorrer los activos
            foreach ($assets as $asset) {
                $status = $this->determineMaintenanceStatus($asset);

                // Agrupar los años de cada estado
                $groupedYears = [
                    'cumplido' => [],
                    'en_proceso' => [],
                    'inconcluso' => []
                ];

                foreach ($status as $year => $state) {
                    $groupedYears[$state][] = $year;
                }

                // Agregar el activo a cada estado si aplica
                foreach (['cumplido', 'en_proceso', 'inconcluso'] as $state) {
                    if (!empty($groupedYears[$state])) {
                        $entry = [
                            'id_asset' => $asset->id,
                            'codigo' => $asset->cod_ass,
                            'serie' => $asset->ser_num_ass,
                            'años' => $groupedYears[$state],
                        ];

                        // Agregar el activo al reporte en el estado correspondiente
                        $report[$state][] = $entry;
                    }
                }
            }

            // Para calcular el total de cada estado
            foreach (['cumplidos', 'en_proceso', 'inconclusos'] as $state) {
                $report[$state] = [
                    'total' => count($report[$state]),
                    'assets' => $report[$state]
                ];

                if (empty($report[$state]['assets']) || $report[$state]['total'] == 0) {
                    unset($report[$state]);
                }
            }

            return response()->json($report, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al generar el reporte',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
