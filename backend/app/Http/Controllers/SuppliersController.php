<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use \Illuminate\Validation\ValidationException;

class SuppliersController extends Controller
{
    public function index(Request $request)
    {
        $supliers = Supplier::all();

        return response()->json([
            'results' => $supliers,
            'message' => 'Proveedor obtenido con exito.'
        ], 200);
    }

    public function show($id)
    {
        try {
            $supplier = Supplier::findOrFail($id);
            return response()->json([
                'result' => $supplier,
                'message' => 'Operación exitosa',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Proveedor no encontrado',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function store(SupplierRequest $request)
    {
        try {
            $validated = $request->validated();
            $supplier = Supplier::create([
                'id_num_sup' => $validated['id_num_sup'],
                'nam_sup' => $validated['nam_sup'],
                'ema_sup' => $validated['ema_sup'],
                'pho_sup' => $validated['pho_sup'],
            ]);

            return response()->json([
                'message' => 'Proveedor creado con éxito',
                'data' => $supplier,
            ], 201);

        } catch (ValidationException $e) {
            $errors = $e->errors();
            return response()->json([
                'message' => 'Datos no válidos',
                'errors' => $errors,
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Hubo un error al crear el proveedor.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(SupplierRequest $request, $id)
    {
        try {
            // Buscar al proveedor por el ID
            $supplier = Supplier::findOrFail($id);

            // Validar los datos recibidos
            $validated = $request->validated();

            // Actualizar el proveedor
            $supplier->update([
                'id_num_sup' => $validated['id_num_sup'],
                'nam_sup' => $validated['nam_sup'],
                'ema_sup' => $validated['ema_sup'],
                'pho_sup' => $validated['pho_sup'],
            ]);

            // Respuesta exitosa
            return response()->json([
                'message' => 'Proveedor actualizado con éxito',
                'data' => $supplier,
            ], 200);

        } catch (ModelNotFoundException $e) {
            // Si el proveedor no se encuentra
            return response()->json([
                'message' => 'Proveedor no encontrado',
                'error' => $e->getMessage(),
            ], 404);

        } catch (ValidationException $e) {
            // Manejar errores de validación
            return response()->json([
                'message' => 'Datos no válidos',
                'errors' => $e->errors(),  // Retorna los errores de validación
            ], 422);

        } catch (Exception $e) {
            // Capturar otros errores generales
            return response()->json([
                'message' => 'Hubo un error al actualizar el proveedor.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        // Buscar el proveedor y manejar errores si no existe
        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->delete();

            return response()->json([
                'message' => 'Proveedor eliminado con éxito',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Proveedor no encontrado',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function search(Request $request)
    {
        $request->validate([
            'term' => 'required|string|max:25',
        ]);

        $term = $request->input('term');

        $suppliers = Supplier::where('pho_sup', 'LIKE', "%{$term}%")->get();

        return response()->json([
            'results' => $suppliers,
            'message' => 'Búsqueda realizada con éxito.',
        ], 200);
    }

}