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

    public function generateMaintenanceReport()
    {
        try {
            $assets = Asset::with(['maintenanceDetails.maintenance', 'income'])->get();

            $report = [
                'desde' => now()->format('d/m/Y'),
                'cumplidos' => [],
                'en_proceso' => [],
                'inconclusos' => []
            ];

            foreach ($assets as $asset) {
                $status = $this->determineMaintenanceStatus($asset);

                foreach ($status as $year => $state) {
                    $entry = [
                        'id' => $asset->id,
                        'codigo' => $asset->cod_ass,
                        'serie' => $asset->ser_num_ass,
                        'año' => $year
                    ];

                    switch ($state) {
                        case 'cumplido':
                            $report['cumplidos'][] = $entry;
                            break;
                        case 'en_proceso':
                            $report['en_proceso'][] = $entry;
                            break;
                        case 'inconcluso':
                            $report['inconclusos'][] = $entry;
                            break;
                    }
                }
            }

            foreach (['cumplidos', 'en_proceso', 'inconclusos'] as $state) {
                $report[$state] = [
                    'total' => count($report[$state]),
                    'assets' => $report[$state]
                ];

                if ($report[$state]['total'] === 0) {
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

    private function determineMaintenanceStatus($asset)
    {
        $currentYear = now()->year;
        $ingresoFecha = optional($asset->income)->date_inc ? Carbon::parse($asset->income->date_inc) : null;

        if (!$ingresoFecha) {
            return []; // Si no hay fecha de ingreso, no hay años que verificar.
        }

        $yearsRequired = [
            $ingresoFecha->year + 1,
            $ingresoFecha->year + 2,
            $ingresoFecha->year + 3,
        ];

        $maintenanceYears = collect($asset->maintenanceDetails)
            ->map(fn($detail) => Carbon::parse($detail->maintenance->created_at)->year)
            ->unique()
            ->toArray();

        $status = [];
        foreach ($yearsRequired as $year) {
            if (in_array($year, $maintenanceYears)) {
                $status[$year] = 'cumplido';
            } elseif ($year < $currentYear) {
                $status[$year] = 'inconcluso';
            } else {
                $status[$year] = 'en_proceso';
            }
        }

        return $status;
    }


    public function maintenancesToAssetsFormated()
    {
        try {
            $assets = Asset::with(['maintenanceDetails.maintenance', 'income'])->get();

            $report = [
                'cumplidos' => [
                    'total' => 0,
                    'assets' => [],
                ],
                'en_proceso' => [
                    'total' => 0,
                    'assets' => [],
                ],
                'inconclusos' => [
                    'total' => 0,
                    'assets' => [],
                ],
            ];

            foreach ($assets as $asset) {
                $mantenimientos = [];
                $cumplidos = true; // Para verificar si todos son "Sí"
                $inconcluso = false; // Para verificar si hay pendientes en el pasado

                foreach ($this->determineMaintenanceStatus($asset) as $year => $state) {
                    $mantenimientos[$year] = ($state === 'cumplido') ? 'Sí' : 'No';

                    if ($state !== 'cumplido') {
                        $cumplidos = false;
                        if ($year < now()->year) {
                            $inconcluso = true;
                        }
                    }
                }

                $entry = [
                    'codigo' => $asset->cod_ass,
                    'serie' => $asset->ser_num_ass,
                    'fechaAdquisicion' => $asset->income->date_inc,
                    'mantenimientos' => $mantenimientos,
                ];

                if ($cumplidos) {
                    $report['cumplidos']['assets'][] = $entry;
                    $report['cumplidos']['total']++;
                } elseif ($inconcluso) {
                    $report['inconclusos']['assets'][] = $entry;
                    $report['inconclusos']['total']++;
                } else {
                    $report['en_proceso']['assets'][] = $entry;
                    $report['en_proceso']['total']++;
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