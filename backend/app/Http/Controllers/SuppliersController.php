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
            'message' => 'Categoria obtenida con exito.'
        ], 200);
    }

    public function show($id)
    {
        try {
            $supplier = Supplier::findOrFail($id);

            $transformedSupplier = [
                'id' => $supplier->id,
                'nam_sup' => $supplier->nam_sup,
                'ema_sup' => $supplier->ema_sup,
                'pho_sup' => $supplier->pho_sup,
                'created_at' => $supplier->created_at->toDateString(),
                'updated_at' => $supplier->updated_at->toDateString(),
            ];

            return response()->json([
                'result' => $transformedSupplier,
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
        $supplier = Supplier::findOrFail($id);

        $validated = $request->validated();
        $supplier->update([
            'nam_sup' => $validated['nam_sup'],
            'ema_sup' => $validated['ema_sup'],
            'pho_sup' => $validated['pho_sup'],
        ]);

        return response()->json([
            'message' => 'Proveedor actualizado con éxito',
            'data' => $supplier,
        ], 200);
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
}