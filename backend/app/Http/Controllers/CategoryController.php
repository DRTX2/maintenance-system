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

        $request->validate([
            'cod_dis' => 'required|string|max:10',
            'tip_dis' => 'required|string|max:10|unique:users,email',
            'nom_dis' => 'required|string|max:25'
        ]);

        try {

            $category = Category::create($request->all());

            return response()->json([
                'category' => $category,
                'message' => 'Usuario almacenado correctamente'
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'Error' => $e->getMessage(),
                500
            ]);
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
        // Encuentra la categoría por ID o lanza un error 404 si no la encuentra
        $category = Category::findOrFail($id);

        // Valida los datos del request
        $validatedData = $request->validate([
            'tip_dis' => 'required|string|max:20',
            'nom_dis' => 'required|string|max:25',
        ]);

        // Actualiza la categoría con los datos validados
        $category->update($validatedData);

        // Devuelve la respuesta en formato JSON
        return response()->json([
            'message' => 'Categoría actualizada con éxito',
            'results' => $category,
        ], 200);
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
}
