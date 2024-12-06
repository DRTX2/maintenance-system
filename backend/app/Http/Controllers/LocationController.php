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
            'codeLocation' => 'required',
            'nameLocation' => 'required'
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
        $location = Location::find($id);
        if (!$location) {
            return response()->json(['message' => 'Ubicación no encontrada', 404]);

        }
        $request->validate([
            'codeLocation' => 'required',
            'nameLocation' => 'required'
        ]);

        $location->update($request->all());
        return response()->json($location, 200);
    }

    /**
     * Remove the specified resource from storage.
     *   $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task->update($request->all());

        return response()->json($task, 200);
     */
    public function destroy(string $id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(["message" => "Ubicación no encontrada"], 404);

        }
        $location->delete();

        return response()->json(["message" => "Ubicación borrada con éxito"],200);
    }


}