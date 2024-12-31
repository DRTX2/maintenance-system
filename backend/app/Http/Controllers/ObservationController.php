<?php

namespace App\Http\Controllers;

use App\Http\Requests\ObservationRequest;
use App\Models\Observation;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ObservationController extends Controller
{
    public function index()
    {
        $observations = Observation::all();
        return response()->json([
            "results" => $observations
        ], 200);
    }

    public function show($id)
    {
        $observation = Observation::fin($id);
        if (!$observation)
            return response()->json(
                ["message" => "Observación solicitada inexistente"],
                404
            );

        return response()->json([
            "results" => $observation
        ], 200);
    }

    public function store(ObservationRequest $request)
    {
        try {
            $observation = Observation::create($request->validated());
            return response()->json([
                "results" => $observation
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function update(ObservationRequest $request, $id)
    {
        try {
            $observation = Observation::findOrFail($id);
            $validatedData = $request->validated();

            $observation->update($validatedData);

            return response()->json([
                "message" => "Observación actualizada"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Observación no encontrada",
                // "error"=>;
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error al actualizar la observación",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        $location = Observation::find($id);

        if (!$location) {
            return response()->json(["message" => "Observación no encontrada"], 404);
        }

        $location->delete();

        return response()->json(["message" => "Observación borrada con éxito"], 200);
    }

    public function search(ObservationRequest $request)
    {
        $request->validate([
            "term" => 'required|max:10'
        ]);

        $term = $request->input('term');
        $observations = Observation::where('des_obs', 'LIKE', "%{$term}%")->get();

        return response()->json([
            'results' => $observations,
        ], 200);
    }
}
