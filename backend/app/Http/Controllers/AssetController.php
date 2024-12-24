<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssetRequest;
use App\Models\Asset;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    //Crear, Actualizar,Eliminar,Ver, Filtrar   


    //cargar la tabla



    public function index()
    {

        $assets = Asset::with(['income', 'category', 'location'])->get();


        if ($assets->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron activos'
            ]);
        }


        $transformedAssets = $assets->map(function ($asset) {
            return [
                'id' => $asset->id,
                'income_code' => $asset->income ? $asset->income->cod_inc : null,
                'category_code' => $asset->category ? $asset->category->cod_dis : null,
                'location_code' => $asset->location ? $asset->location->cod_loc : null,
                'cod_ass' => $asset->cod_ass,
                'ser_num_ass' => $asset->ser_num_ass,
                'obs_add_ass' => $asset->obs_add_ass ?? null,
            ];
        });


        return response()->json($transformedAssets, 200);
    }



    public function show($id)
    {
        // Cargar el activo junto con sus relaciones
        $asset = Asset::with(['income', 'category', 'location', 'components'])->findOrFail($id);

        // Transformar los componentes para incluir los datos relevantes y la información de la tabla pivote
        $components = $asset->components->map(function ($component) {
            return [
                'id' => $component->id,
                'cod_com' => $component->cod_com,
                'nam_com' => $component->nam_com,
                'des_com' => $component->des_com,
                'pivot' => [
                    'description' => $component->pivot->description,
                ],
            ];
        });

        $response = [
            'id' => $asset->id,
            'id_inc_ass' => $asset->income ? $asset->income->id : null,
            'id_cat_ass' => $asset->category ? $asset->category->id : null,
            'id_loc_ass' => $asset->location ? $asset->location->id : null,
            'income_code' => $asset->income ? $asset->income->cod_inc : null,
            'category_code' => $asset->category ? $asset->category->cod_dis : null,
            'location_code' => $asset->location ? $asset->location->cod_loc : null,
            'cod_ass' => $asset->cod_ass,
            'ser_num_ass' => $asset->ser_num_ass,
            'obs_add_ass' => $asset->obs_add_ass,
            'created_at' => $asset->created_at,
            'updated_at' => $asset->updated_at,
            'components' => $components,
        ];


        return response()->json($response);
    }

    public function store(AssetRequest $request)
    {


        $validatedData = $request->validated();

        $service = $validatedData['asset'];



        $service = $request->input('asset');

        $asset = Asset::create([

            'id_inc_ass' => $service['id_inc_ass'],
            'id_cat_ass' => $service['id_cat_ass'],
            'id_loc_ass' => $service['id_loc_ass'],
            'cod_ass' => $service['cod_ass'],
            'ser_num_ass' => $service['ser_num_ass'],
            'obs_add_ass' => $service['obs_add_ass'] ?? null,

        ]);


        $components = collect($service['components'])->mapWithKeys(function ($component) {
            return [
                $component['id'] => [
                    'description' => $component['pivot']['description'],
                ],
            ];
        });

        $asset->components()->attach($components);

        return response()->json([
            'message' => 'Activo creado exitosamente.',
            'asset' => $asset,
        ]);
    }

    /**
 * 
 *     public function index()
    {
        $incomes = Income::all();

        if ($incomes->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron registros de ingresos.',
            ], 404);
        }
        return response()->json($incomes, 200);
    }

    public function show($id)
    {

        $device = Category::with('components')->findOrFail($id);

        return response()->json([
            'device' => $device
        ]);

    }
 */

}