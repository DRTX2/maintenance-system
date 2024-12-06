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
    public function index(){
        $suppliers = Supplier::all();
        
        return response()->json([
            'results' => $suppliers,
            'message' => 'Operación exitosa',
        ], 200);
    }
    
    public function show($id){
        try {
            $supplier = Supplier::findOrFail($id);
            
            return response()->json([
                'results' => $supplier,
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
                'nam_sup' => $validated['name'],
                'ema_sup' => $validated['email'],
                'pho_sup' => $validated['phone'],
            ]);
    
            return response()->json([
                'message' => 'Proveedor creado con éxito',
                'results' => $supplier,
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

    public function update(SupplierRequest $request, $id){
        $supplier = Supplier::findOrFail($id);

        $validated = $request->validated();
        $supplier->update([
            'nam_sup' => $validated['name'],
            'ema_sup' => $validated['email'],
            'pho_sup' => $validated['phone'],
        ]);

        return response()->json([
            'message' => 'Proveedor actualizado con éxito',
            'results' => $supplier,
        ], 200);
    }

    public function destroy($id){
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
