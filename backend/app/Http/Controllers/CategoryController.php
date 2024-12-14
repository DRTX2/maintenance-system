<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'results' => $categories,
            'message' => 'Categoría obtenida con éxito.'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validación de los datos del request
            $validated = $request->validate([
                'cod_dis' => 'required|string|max:10|unique:categories,cod_dis',
                'tip_dis' => 'required|string|max:10',
                'nom_dis' => 'required|string|max:25'
            ], [
                'cod_dis.unique' => 'El código de la categoría ya existe. Por favor, elija otro.'
            ]);

            // Intentamos crear el registro
            $category = Category::create($validated);

            // Devolvemos la respuesta
            return response()->json([
                'category' => $category,
                'message' => 'Categoría almacenada correctamente'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {

            $errors = $e->errors();


            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $errors
            ], 422);
        } catch (\Exception $e) {
            // Captura cualquier otro error
            return response()->json([
                "message" => 'Error inesperado',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        return response()->json([
            'result' => $category,
            'message' => 'Categoría obtenida con éxito.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        try {
            // Validación de los campos
            $validated = $request->validate([
                'cod_dis' => 'required|unique:categories,cod_dis,' . $category->id,
                'tip_dis' => 'required|string|max:20',
                'nom_dis' => 'required|string|max:25',
            ], [
                'cod_dis.unique' => 'El código de la categoría ya existe. Por favor, elija otro.'
            ]);

            // Actualizar la categoría con los datos validados
            $category->update($validated);

            // Responder con la categoría actualizada
            return response()->json(['message' => 'Categoría actualizada', 'data' => $category], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            $errors = $e->errors();



            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $errors
            ], 422);

        } catch (\Exception $e) {
            // Captura cualquier otro error
            return response()->json(['message' => 'Error al actualizar la categoría'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        try {
            $category->delete();
            return response()->json(['message' => 'Categoría eliminada exitosamente'], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar la categoría'], 500);
        }
    }

    /**
     * Search categories based on term.
     */
    public function search(Request $request)
    {
        try {
            $request->validate([
                'term' => 'required|string|max:25',
            ]);

            $term = $request->input('term');
            $categories = Category::where('cod_dis', 'LIKE', "%{$term}%")->get();

            return response()->json([
                'results' => $categories,
                'message' => 'Búsqueda realizada con éxito.',
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Captura los errores de validación
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            // Captura cualquier otro error
            return response()->json(['message' => 'Error al realizar la búsqueda'], 500);
        }
    }
}