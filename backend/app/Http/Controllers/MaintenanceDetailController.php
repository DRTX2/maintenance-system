<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceDetail;
use Illuminate\Http\Request;

class MaintenanceDetailController extends Controller
{
    public function index($id)
    {
        $maintenanceDetail = MaintenanceDetail::with([
            'maintenance',
            'asset',
            'observations', 
            'activities',
            'replacedComponents',
            ])
        ->find($id);
        if (!$maintenanceDetail)
            return response()->json(["message" => "No existe el mantenimiento solicitado"], 404);

        return response()->json([
            "results" => $maintenanceDetail,
        ], 200);
    }
}
