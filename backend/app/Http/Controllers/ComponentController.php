<?php

namespace App\Http\Controllers;

use App\Models\Component;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use \Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class ComponentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $components= Component::all();
        return response()->json([
            "results"=>$components,
            "message"=>"Componentes obtenidos exitosamente"// deberia ser una respuesta asi, es decir solo es exitosa no importa nada mas
        ],200);
    }

    public function store(Request $request)
    {
        try {
            $validated=$request->validate([
                "cod_com"=>"require|string|max:10",
                "nam_com"=>"require|string|max:25",
                "des_com"=>"require|string|max:50",
            ]);
            $component = Component::create([
                'cod_com' => $validated['cod_com'],
                'nam_com' => $validated['nam_com'],
                'des_com' => $validated['des_com']
            ]);

            return response()->json([
                'message' => 'Componente creado con éxito',
                'result' => $component,
            ], 201);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            return response()->json([
                'message' => 'Datos no válidos',
                'errors' => $errors,
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Hubo un error al crear el componente.',
                'error' => $e->getMessage(),
            ], 500);
        }

        
    }

    public function show(string $id)
    {
        try {
            $component = Component::findOrFail($id);
            return response()->json([
                'result' => $component,
                'message' => 'Operación exitosa',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Componente no encontrado',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $component = Component::findOrFail($id);
            $validated = $request->validate([
                "cod_com"=>"require|string|max:10",
                "nam_com"=>"require|string|max:25",
                "des_com"=>"require|string|max:50",
            ]);

            $component->update([
                "cod_com"=>$validated["cod_com"],
                "nam_com"=>$validated["nam_com"],
                "des_com"=>$validated["des_com"],
            ]);

            // Respuesta exitosa
            return response()->json([
                'message' => 'Componente actualizado con éxito',
                'result' => $component,
            ], 200);

        } catch (ModelNotFoundException $e) {
            // Si el proveedor no se encuentra
            return response()->json([
                'message' => 'Componente no encontrado',
                'error' => $e->getMessage(),
            ], 404);

        } catch (ValidationException $e) {
            // Manejar errores de validación
            return response()->json([
                'message' => 'Datos no válidos',
                'errors' => $e->errors(),
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Hubo un error al actualizar el proveedor.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
