<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReplacedComponentRequest;
use App\Models\ReplacedComponent;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ReplacedComponentController extends Controller
{
    public function index()
    {
        $replacedComponents = ReplacedComponent::all();
        return response()->json([
            "results" => $replacedComponents
        ], 200);
    }

    public function show($id)
    {
        $replacedComponent = ReplacedComponent::find($id);
        if (!$replacedComponent) {
            return response()->json(
                ["message" => "Componente reemplazado no encontrado"],
                404
            );
        }

        return response()->json([
            "results" => $replacedComponent
        ], 200);
    }

    public function store(ReplacedComponentRequest $request)
    {
        try {
            $replacedComponent = ReplacedComponent::create($request->validated());
            return response()->json([
                "results" => $replacedComponent
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function update(ReplacedComponentRequest $request, $id)
    {
        try {
            $replacedComponent = ReplacedComponent::findOrFail($id);
            $validatedData = $request->validated();

            $replacedComponent->update($validatedData);

            return response()->json([
                "message" => "Componente reemplazado actualizado con éxito"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Componente reemplazado no encontrado",
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error al actualizar el componente reemplazado",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $replacedComponent = ReplacedComponent::find($id);

        if (!$replacedComponent) {
            return response()->json(["message" => "Componente reemplazado no encontrado"], 404);
        }

        $replacedComponent->delete();

        return response()->json(["message" => "Componente reemplazado eliminado con éxito"], 200);
    }

    public function search(Request $request)
    {
        $request->validate([
            "term" => 'required|string|max:255'
        ]);

        $term = $request->input('term');
        $replacedComponents = ReplacedComponent::where('des_rep_com', 'LIKE', "%{$term}%")->get();

        return response()->json([
            'results' => $replacedComponents,
        ], 200);
    }
}
