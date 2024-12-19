<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json([
            "results" => $users,
            "message" => "Operacion exitosa",
            // como el josue toma el ok del status m parece innecesario poner mensaje
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                "name" => "required|string|max:255",
                "email" => "required|string|max:255|unique:users,email",
                "password" => "required|string|max:255",
                "role" => "nullable|string",
            ], [
                "email.unique" => "Correo electronico duplicado"
            ]);

            $user = User::create([
                "name" => $validated["name"],
                "email" => $validated["email"],
                "password" => bcrypt($validated["password"]),
                "role" => $validated["role"] ?? "user",
            ]);

            return response()->json([
                "message" => "Usuario creado exitosamente",
                "results" => $user
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Errores de validación",
                "errors" => $e->errors(),
            ], 422);
        }
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user)
            return response()->json([
                "message" => "Usuario no encontrado",
            ], 404);

        return response()->json([
            "results" => $user,
            "message" => "Usuario obtenido exitosamente"
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user)
            return response()->json([
                "message" => "Usuario no encontrado"
            ], 404);

        try {
            $validatedData = $request->validate([
                "name" => "required|string|max:255",
                "email" => "required|string|max:255|unique:users,email,$id",
                "password" => "required|string|max:255",
            ], [
                "email.unique" => "Correo electronico duplicado"
            ]);

            $user->update($validatedData);

            return response()->json([
                "message" => "Usuario actualizado exitosamente"
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Errores de validación",
                "errors" => $e->errors(),
            ], 422);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user)
            return response()->json([
                "message" => "Usuario no encontrado"
            ], 404);

        $user->delete();
        return response()->json([
            "message" => "Usuario eliminado con exito."
        ], 200);
    }

    public function search(Request $request)
    {
        $request->validate([
            "term" => "required|string|min:1|max:50",
        ]);
        $term = $request["term"] ?? "";
        $users = User::where("email", "LIKE", "%$term%")->get();

        return response()->json([
            "results" => $users,
        ], 200);
    }
}
