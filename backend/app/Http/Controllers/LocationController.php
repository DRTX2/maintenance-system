<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index(Request $request)
    {
        $row = $request->input('rows', 10);
        $ubications = Location::paginate($row);
        // Renombrar las columnas
        $ubications->getCollection()->transform(function ($item) {
            return [
                'id'=>$item->id,
                'codigo' => $item->cod_loc, 
                'nombre' => $item->nam_loc, 
                'created_at' => $item->created_at->toDateString(), 
                'updated_at' => $item->updated_at->toDateString(),
            ];
        });

        return response()->json([
            'data' => $ubications,
            'message' => 'Operación exitosa',
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|unique:locations,cod_loc',
            'nombre' => 'required'
        ]);

        $location = Location::create([
            'cod_loc'=> $request['codigo'],
            'nam_loc'=> $request['nombre'],
        ]);
        return response()->json([
            'message' => 'Ubicación creada con éxito',
            'data' => $location
        ], 201);
    }

    public function show(string $id)
    {

        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Ubicación no encontrada', 404]);

        }

        $transformedLocation = [
            'id'=>$location->id,
            'codigo' => $location->cod_loc,  
            'nombre' => $location->nam_loc, 
            'created_at' => $location->created_at->toDateString(), 
            'updated_at' => $location->updated_at->toDateString(), 
        ];

        return response()->json([
            'data' => $transformedLocation,
            'message' => 'Operación exitosa',
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Ubicación no encontrada'], 404);
        }

        $request->validate([
            'codigo' => 'required|unique:locations,cod_loc,' . $location->id,
            'nombre' => 'required'
        ]);
        
        $location->update([
            'cod_loc'=>$request['codigo'],
            'nam_loc'=>$request['nombre'],
        ]);

        // Responder con la ubicación actualizada
        return response()->json(['message' => 'Ubicacion actualizada', 'data' => $location], 200);
    }

    public function destroy(string $id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(["message" => "Ubicación no encontrada"], 404);

        }
        $location->delete();

        return response()->json(["message" => "Ubicación borrada con éxito"], 200);
    }


}