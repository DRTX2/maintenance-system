<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\SuppliersController;

use App\Http\Middleware\JwtMiddleware;

// Coloca aqui las rutas que no estarán protegidas.
Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);


Route::get('suppliers', [SuppliersController::class, 'index']);
Route::get('suppliers/{id}', [SuppliersController::class, 'show']);
Route::post('suppliers', [SuppliersController::class, 'store']);
Route::put('suppliers/{id}', [SuppliersController::class, 'update']);
Route::delete('suppliers/{id}', [SuppliersController::class, 'destroy']);


Route::middleware([JwtMiddleware::class])->group(function () {
    // Coloca aqui las rutas que estarán protegidas.
});