<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
use Illuminate\Http\Request;

class IncomeController extends Controller
{
    //
}
=======
use App\Models\Income;
use App\Models\Supplier;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class IncomeController extends Controller
{
    public function index()
    {
        $incomes = Income::all();
        return response()->json($incomes);
    }

    public function show($id){
        try {
            $supplier = Income::find($id);
            
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
    
    public function showBySupplier($supplierId)
    {
        $incomes = Income::where('id_sup_inc',$supplierId)->get();

        return response()->json(["data"=>$incomes, "message"=>"Operation ends well"],200); 
    }

    public function store(Request $request, $supplierId)
    {
        try {
            $validatedData = $request->validate([
                "time" => "nullable|date",
                "state" => "required|string|max:1"
            ]);

            Supplier::findOrFail($supplierId);

            $income = new Income();
            $income->updated_at = $validatedData["time"] ?? now();
            $income->est_inc = $validatedData["state"];
            $income->id_sup_inc = $supplierId;
            $income->save();

            return response()->json([
                "message" => "Ingreso creado exitosamente.",
            ], 201);
        } catch (ValidationException $exception) {
            return response()->json([
                "message" => "Errores de validación.",
                "errors" => $exception->errors()
            ], 422);
        } catch (Exception $exception) {
            return response()->json([
                "message" => "Ocurrió un error inesperado."
            ], 500);
        }
    }

    public function update(Request $request, $incomeId)
    {
        try {
            $income = Income::findOrFail($incomeId);

            $validatedData = $request->validate([
                "time" => "nullable|date",
                "state" => "nullable|string|max:1"
            ]);

            $income->updated_at = $validatedData["time"] ?? $income->updated_at;
            $income->est_inc = $validatedData["state"] ?? $income->est_inc;
            $income->save();

            return response()->json([
                "message" => "Ingreso actualizado exitosamente.",
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                "message" => "Errores de validación.",
                "errors" => $exception->errors()
            ], 422);
        } catch (Exception $exception) {
            return response()->json([
                "message" => "Ocurrió un error inesperado."
            ], 500);
        }
    }

    public function destroy($incomeId)
    {
        try {
            $income = Income::find($incomeId);
            $message="Ingreso eliminado con éxito.";
            if(!$income){
                return response()->json([
                    "message" => $income?"Ingreso eliminado con éxito.":"El ingreso no existe"
                ],404);
            }
            $income->delete();
            return response()->json([
                "message" => "Ingreso eliminado con éxito."
            ],200);
           
        } catch (Exception $exception) {
            return response()->json([
                "message" => "Ocurrió un error inesperado."
            ], 500);
        }
    }
}
>>>>>>> fc8be86625276101af048c257ebd6aafed09090f
