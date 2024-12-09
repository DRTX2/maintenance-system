<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index(Request $request)
    {

        $locations = Location::all();

        return response()->json([
            'results' => $locations,
            'message' => 'Categoria obtenida con exito.'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cod_loc' => 'required|unique:locations,cod_loc',
            'nam_loc' => 'required'
        ]);

        $location = Location::create([
            'cod_loc' => $request['cod_loc'],
            'nam_loc' => $request['nam_loc'],
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

        // $transformedLocation = [
        //     'id' => $location->id,
        //     'codigo' => $location->cod_loc,
        //     'nombre' => $location->nam_loc,
        //     'created_at' => $location->created_at->toDateString(),
        //     'updated_at' => $location->updated_at->toDateString(),
        // ];

        return response()->json([
            'result' => $location,
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
            'cod_loc' => 'required|unique:locations,cod_loc,' . $location->id,
            'nam_loc' => 'required'
        ]);

        $location->update([
            'cod_loc' => $request['cod_loc'],
            'nam_loc' => $request['nam_loc'],
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