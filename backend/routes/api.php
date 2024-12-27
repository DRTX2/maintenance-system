<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\ResponsibleController;
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

Route::get('/categories/types', [CategoryController::class, 'getTypes']);

Route::get('/categories/names', [CategoryController::class, 'getNames']);

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




//Ingresos
Route::get('/incomes', [IncomeController::class, 'index']);
Route::post('/incomes', [IncomeController::class, 'store']);
Route::get('/incomes/{id}', [IncomeController::class, 'show']);
//Route::get('incomes/by-supplier/{id}', [IncomeController::class, 'showBySupplier']);
Route::put('/incomes/{id}', [IncomeController::class, 'update']);
Route::delete('/incomes/{id}', [IncomeController::class, 'destroy']);
Route::post('/incomes/search', [IncomeController::class, 'search']);

//Responsables

Route::get('/responsibles', [ResponsibleController::class, 'index']);
Route::post('/responsibles', [ResponsibleController::class, 'store']);
Route::get('/responsibles/{id}', [ResponsibleController::class, 'show']);
Route::put('/responsibles/{id}', [ResponsibleController::class, 'update']);
Route::delete('/responsibles/{id}', [ResponsibleController::class, 'destroy']);
Route::post('/responsibles/search', [ResponsibleController::class, 'search']);



//Activos
Route::get('/assets/{rol}', [AssetController::class, 'index']);
Route::get('/assets/show/{id}', [AssetController::class, 'show']);
//Mostrar ingresoso solo abiertos
Route::get('/assets/incomes/{id}', [AssetController::class, 'showOpenIncomes']);
Route::put('/assets/{id}', [AssetController::class, 'update']);
//Ocultar, Mostrar
Route::put('/assets/hide/{id}', [AssetController::class, 'hideAsset']);
Route::put('/assets/visible/{id}', [AssetController::class, 'visibleAsset']);
Route::post(
    '/assets',
    [AssetController::class, 'store']
);
Route::post('/assets/search/{rol}', [AssetController::class, 'search']);
Route::post('/assets/filters', [AssetController::class, 'indexWithFilters']);
Route::post('/assets/status', [AssetController::class, 'getStatus']);



//Mantenimientos - aun no gestiono su relacion con activos/responsables

Route::get('/maintenances', [MaintenanceController::class, 'index']);
Route::post('/maintenances', [MaintenanceController::class, 'store']);
Route::post('/maintenances/search', [MaintenanceController::class, 'search']); // Antes
Route::get('/maintenances/{id}', [MaintenanceController::class, 'show']);
Route::put('/maintenances/{id}', [MaintenanceController::class, 'update']);
Route::post('/maintenances/{id}', [MaintenanceController::class, 'hide'])->where('id', '[0-9]+');

// aun no probe los cambios hechos al usar id, ni testeado estas rutas de mantenimientos