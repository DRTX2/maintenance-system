<?php

use App\Http\Controllers\LocationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;

// Coloca aqui las rutas que no estarán protegidas.
Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

Route::middleware([JwtMiddleware::class])->group(function () {
    // Coloca aqui las rutas que estarán protegidas.
});

//Rutas para las ubicaciones 

Route::get('/locations', [LocationController::class, 'index']);
Route::post('/locations', [LocationController::class, 'store']);
Route::get('/locations/{id}', [LocationController::class, 'show']);
Route::put('/locations/{id}', [LocationController::class, 'update']);
Route::delete('/locations/{id}', [LocationController::class, 'destroy']);