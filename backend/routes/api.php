<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\MaintenanceDetailController;
use App\Http\Controllers\ObservationController;
use App\Http\Controllers\ReplacedComponentController;
use App\Http\Controllers\ResponsibleController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\TypeMaintenanceController;
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
Route::delete('/incomes/open', [IncomeController::class, 'showOpenIncomes']);
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
Route::get('/assetsForMaintances', [AssetController::class, 'indexForMaintenances']);
Route::get('/assets/showForMaintances/{id}', [AssetController::class, 'showForManteinces']);
Route::get('/assets/show/{id}', [AssetController::class, 'show']);

//Mostrar ingresoso solo abiertos

Route::get('/assets/incomes/create', [AssetController::class, 'showOpenIncomesCreate']);

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



//Mantenimientos - aun no gestiono su relacion con responsables

Route::get('/maintenances', [MaintenanceController::class, 'index']);
Route::post('/maintenances', [MaintenanceController::class, 'store']);
Route::post('/maintenances/search', [MaintenanceController::class, 'search']);
Route::get('/maintenances/{id}', [MaintenanceController::class, 'show']);
Route::put('/maintenances/{id}', [MaintenanceController::class, 'update']);
Route::post('/maintenances/{id}', [MaintenanceController::class, 'hide'])->where('id', '[0-9]+');

// Observations

Route::get('/observations', [ObservationController::class, 'index']);
Route::post('/observations', [ObservationController::class, 'store']);
Route::get('/observations/{id}', [ObservationController::class, 'show']);
Route::put('/observations/{id}', [ObservationController::class, 'update']);
Route::delete('/observations/{id}', [ObservationController::class, 'destroy']);
Route::post('/observations/search', [ObservationController::class, 'search']);

// Type Maintenances
// comente algunas porq creo q no vamos a usar, pero por si acaso tenerlas
Route::get('/type-maintenance', [TypeMaintenanceController::class, 'index']);
// Route::post('/type-maintenance', [ActivityController::class, 'store']);
Route::get('/type-maintenance/{id}', [TypeMaintenanceController::class, 'show']);
// Route::put('/type-maintenance/{id}', [ActivityController::class, 'update']);
// Route::delete('/type-maintenance/{id}', [ActivityController::class, 'destroy']);
// Route::post('/type-maintenance/search', [ActivityController::class, 'search']);


// Maintenance activities

Route::get('/activities', [ActivityController::class, 'index']);
Route::post('/activities', [ActivityController::class, 'store']);
Route::get('/activities/{id}', [ActivityController::class, 'show']);
Route::put('/activities/{id}', [ActivityController::class, 'update']);
Route::delete('/activities/{id}', [ActivityController::class, 'destroy']);
Route::post('/activities/search', [ActivityController::class, 'search']);

// Replaced Components

Route::get('/replaced-components', [ReplacedComponentController::class, 'index']);
Route::post('/replaced-components', [ReplacedComponentController::class, 'store']);
Route::get('/replaced-components/{id}', [ReplacedComponentController::class, 'show']);
Route::put('/replaced-components/{id}', [ReplacedComponentController::class, 'update']);
Route::delete('/replaced-components/{id}', [ReplacedComponentController::class, 'destroy']);
Route::post('/replaced-components/search', [ReplacedComponentController::class, 'search']);

// Maintenance Details
Route::get('/maintenance-detail', [MaintenanceDetailController::class, 'index']);
Route::get('/maintenance-detail/{id}', [MaintenanceDetailController::class, 'show']);
Route::post('/maintenance-detail', [MaintenanceDetailController::class, 'store']);
Route::put('/maintenance-detail/{id}', [MaintenanceDetailController::class, 'update']);
