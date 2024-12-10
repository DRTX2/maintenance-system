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
            'message' => 'Categoria obtenida con exito.'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de los datos del request
        $request->validate([
            'cod_dis' => 'required|string|max:10|unique:categories,cod_dis',
            'tip_dis' => 'required|string|max:10',
            'nom_dis' => 'required|string|max:25'
        ]);

        try {
            // Intentamos crear el registro
            $category = Category::create($request->all());

            // Devolvemos la respuesta
            return response()->json([
                'category' => $category,
                'message' => 'Categoría almacenada correctamente'
            ], 201);

        } catch (\Exception $e) {
            // Devolvemos el error
            return response()->json([
                'error' => $e->getMessage(),
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
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }

        return response()->json([
            'result' => $category,
            'message' => 'Categoria obtenida con exito.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Buscar la categoría a actualizar
        $category = Category::find($id);

        // Si no se encuentra la categoría
        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        // Validación de los campos
        $request->validate([
            'cod_dis' => 'required|unique:categories,cod_dis,' . $category->id,
            'tip_dis' => 'required|string|max:20',
            'nom_dis' => 'required|string|max:25',
        ]);

        // Actualizar la categoría con los datos validados
        $category->update($request->all());

        // Responder con la categoría actualizada
        return response()->json(['message' => 'Categoría actualizada', 'data' => $category], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }

        try {
            $category->delete();
            return response()->json(['message' => 'Categoria eliminada exitosamente'], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar la categoría'], 500);
        }
    }

    public function search(Request $request)
    {
        $request->validate([
            'term' => 'required|string|max:25',
        ]);

        $term = $request->input('term');

        $categories = Category::where('nom_dis', 'LIKE', "%{$term}%")->get();

        return response()->json([
            'results' => $categories,
            'message' => 'Búsqueda realizada con éxito.',
        ], 200);
    }

}