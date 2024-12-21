<?php

use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\JwtMiddleware;

// no probadas
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::post('/users/search', [UserController::class, 'search']);


// Coloca aqui las rutas que no estarán protegidas.
Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::post('logout', [JWTAuthController::class, 'logout']);

Route::get('/suppliers', [SuppliersController::class, 'index']);
Route::post('/suppliers', [SuppliersController::class, 'store']);
Route::get('/suppliers/{id}', [SuppliersController::class, 'show']);
Route::put('/suppliers/{id}', [SuppliersController::class, 'update']);
Route::delete('/suppliers/{id}', [SuppliersController::class, 'destroy']);
Route::post('/suppliers/search', [SuppliersController::class, 'search']);



//Obtener dispositivos
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/show/{id}', [CategoryController::class, 'show']);

//Las borrare luego
// Route::put('category/update/{id}', [CategoryController::class, 'update']);
// Route::delete('category/destroy/{id}', [CategoryController::class, 'destroy']);
// Route::post('/categories/search', [CategoryController::class, 'search']);
// Route::post('category/store', [CategoryController::class, 'store']);

Route::middleware([JwtMiddleware::class])->group(function () {
    // Coloca aqui las rutas que estarán protegidas.
});

//Rutas para las ubicaciones 

Route::get('/locations', [LocationController::class, 'index']);
Route::post('/locations', [LocationController::class, 'store']);
Route::get('/locations/{id}', [LocationController::class, 'show']);
Route::put('/locations/{id}', [LocationController::class, 'update']);
Route::delete('/locations/{id}', [LocationController::class, 'destroy']);
Route::post('/locations/search', [LocationController::class, 'search']);

Route::get('incomes', [IncomeController::class, 'index']);
Route::get('incomes/{id}', [IncomeController::class, 'show']);
Route::get('incomes/by-supplier/{id}', [IncomeController::class, 'showBySupplier']);
Route::post('incomes/{supplierId}', [IncomeController::class, 'store']);
Route::put('incomes/{id}', [IncomeController::class, 'update']);
Route::delete('incomes/{id}', [IncomeController::class, 'destroy']);