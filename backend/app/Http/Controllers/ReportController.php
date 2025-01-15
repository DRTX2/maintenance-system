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

        $maintenances = Maintenance::query();

        if ($request->has('asset') && $request->input('asset')) {
            $maintenances->whereHas('maintenanceDetails.asset', function ($query) use ($request) {
                $query->where('id', $request->input('asset'));
            });
        }

        $maintenances = $this->maintenanceReportService->loadRelations($maintenances)->get();

        $transformedMaintenances = $this->maintenanceReportService->transformForSpecificAsset($maintenances, $request->input('asset'));

        return response()->json([
            'results' => $transformedMaintenances
        ], 200);
    }

    public function maintenancesToAssets()
    {
        try {
            $assets = Asset::with('maintenanceDetails.maintenance', 'income')->get();

            $report = [
                'assets' => [
                    'cumplidos' => [],
                    'en_proceso' => [],
                    'inconclusos' => []
                ]
            ];

            // Recorremos cada activo
            foreach ($assets as $asset) {
                $status = $this->determineMaintenanceStatus($asset);

                // Inicializamos los arrays de los tres estados
                $cumplidos = [];
                $en_proceso = [];
                $inconclusos = [];

                // Clasificamos los años de cada activo
                foreach ($status as $year => $state) {
                    // El año será la clave, y el estado será el valor
                    $estado = '';
                    switch ($state) {
                        case 'cumplido':
                            $estado = 'Realizado';
                            break;
                        case 'en_proceso':
                            $estado = 'Por realizar';
                            break;
                        case 'inconcluso':
                            $estado = 'Sin realizar';
                            break;
                    }

                    // Clasificamos según el estado
                    switch ($state) {
                        case 'cumplido':
                            $cumplidos[$year] = $estado;
                            break;
                        case 'en_proceso':
                            $en_proceso[$year] = $estado;
                            break;
                        case 'inconcluso':
                            $inconclusos[$year] = $estado;
                            break;
                    }
                }

                // Ahora, decidimos en qué categoría clasificar el activo
                if (count($inconclusos) > 0) {
                    // Si hay algún año inconcluso, lo clasificamos como "inconcluso"
                    $report['assets']['inconclusos'][] = [
                        'id' => $asset->id,
                        'cod_inc' => $asset->income->cod_inc,
                        'fec_inc' => $asset->income->date_inc,
                        'codigo' => $asset->cod_ass,
                        'serie' => $asset->ser_num_ass,
                        'mantenimientos' => $inconclusos,
                    ];
                } elseif (count($en_proceso) > 0) {
                    // Si no hay inconclusos pero hay algún año en proceso, lo clasificamos como "en proceso"
                    $report['assets']['en_proceso'][] = [
                        'id' => $asset->id,
                        'cod_inc' => $asset->income->cod_inc,
                        'fec_inc' => $asset->income->date_inc,
                        'codigo' => $asset->cod_ass,
                        'serie' => $asset->ser_num_ass,
                        'mantenimientos' => $en_proceso,
                    ];
                } else {
                    // Si todo está cumplido, lo clasificamos como "cumplido"
                    $report['assets']['cumplidos'][] = [
                        'id' => $asset->id,
                        'cod_inc' => $asset->income->cod_inc,
                        'fec_inc' => $asset->income->date_inc,
                        'codigo' => $asset->cod_ass,
                        'serie' => $asset->ser_num_ass,
                        'mantenimientos' => $cumplidos,
                    ];
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

    private function determineMaintenanceStatus($asset)
{
    $ingresoFecha = Carbon::parse($asset->income->date_inc); // Convertir la fecha de ingreso a Carbon

    // Los tres años consecutivos después de un año del ingreso
    $yearsRequired = [
        $ingresoFecha->year + 1, // Primer año requerido
        $ingresoFecha->year + 2, // Segundo año requerido
        $ingresoFecha->year + 3  // Tercer año requerido
    ];
    // $yearsRequired = range($ingresoFecha->year + 1, $ingresoFecha->year + 3);


    // Recopilar los años de mantenimiento realizados
    $maintenanceYears = [];
    foreach ($asset->maintenanceDetails as $maintenanceDetail) {
        $maintenanceYear = (int)Carbon::parse($maintenanceDetail->maintenance->created_at)->year;
        $maintenanceYears[] = $maintenanceYear;
    }
    $maintenanceYears = array_unique($maintenanceYears); // Eliminar duplicados

    // Determinar el estado de cada año requerido
    $status = [];
    foreach ($yearsRequired as $year) {
        if (in_array($year, $maintenanceYears)) {
            // Si se realizó mantenimiento ese año
            $status[$year] = 'cumplido';
        } elseif ($year < now()->year) {
            // Si el año ya pasó y no se realizó mantenimiento
            $status[$year] = 'inconcluso';
        } else {
            // Si el año está en el futuro
            $status[$year] = 'en_proceso';
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
