<?php

use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;
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

Route::get('category', [CategoryController::class, 'index']);
Route::post('category/store', [CategoryController::class, 'store']);
Route::get('category/show/{id}', [CategoryController::class, 'show']);
Route::put('category/update/{id}', [CategoryController::class, 'update']);
Route::delete('category/destroy/{id}', [CategoryController::class, 'destroy']);

Route::middleware([JwtMiddleware::class])->group(function () {
    // Coloca aqui las rutas que estarán protegidas.
});

//Rutas para las ubicaciones 

Route::get('/locations', [LocationController::class, 'index']);
Route::post('/locations', [LocationController::class, 'store']);
Route::get('/locations/{id}', [LocationController::class, 'show']);
Route::put('/locations/{id}', [LocationController::class, 'update']);
Route::delete('/locations/{id}', [LocationController::class, 'destroy']);

Route::get('incomes', [IncomeController::class, 'index']);
Route::get('incomes/{id}', [IncomeController::class, 'show']);
Route::get('incomes/by-supplier/{id}', [IncomeController::class, 'showBySupplier']);
Route::post('incomes/{supplierId}', [IncomeController::class, 'store']);
Route::put('incomes/{id}', [IncomeController::class, 'update']);
Route::delete('incomes/{id}', [IncomeController::class, 'destroy']);