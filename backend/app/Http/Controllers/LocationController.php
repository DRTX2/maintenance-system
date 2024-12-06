<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /**
         *    $tasks = Task::all();

        return response()->json(['results' => $tasks], 200);

                 */

        $ubications = Location::all();

        return response()->json(['results' => $ubications], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            'cod_loc' => 'required|unique:locations,cod_loc',
            'nam_loc' => 'required'
        ]);

        $location = Location::create($request->all());
        return response()->json([
            'message' => 'Ubicación creada con éxito',
            'data' => $location
        ], 201);
    }

    /**
     *   $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task = Task::create($request->all());

        return response()->json($task, 201);
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Ubicación no encontrada', 404]);

        }

        return response()->json($location, 200);

        //

        /**
  
         * 
         */
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Buscar la ubicación a actualizar
        $location = Location::find($id);

        // Si no se encuentra la ubicación
        if (!$location) {
            return response()->json(['message' => 'Ubicación no encontrada'], 404);
        }

        // Validación de los campos
        $request->validate([
            'cod_loc' => 'required|unique:locations,cod_loc,' . $location->id,
            'nam_loc' => 'required'
        ]);

        // Actualizar la ubicación
        $location->update($request->all());

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