<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssetRequest;
use App\Models\Asset;
use App\Models\Income;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    //Crear, Actualizar,Eliminar,Ver, Filtrar   


    //cargar la tabla
    public function showOpenIncomes()
    {


        $incomes = Income::where('est_inc', 'O')->get();

        if ($incomes->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron ingresos'
            ]);
        }

        return response()->json($incomes, 200);
    }
    public function hideAsset($id)
    {
        $asset = Asset::findOrFail($id);

        if ($asset->est_ass === 'H') {
            return response()->json([
                'message' => 'El activo ya está oculto.',
            ]);
        }

        $asset->update([
            'est_ass' => 'H',
        ]);

        return response()->json([
            'message' => 'Activo oculto.',
        ]);
    }

    public function visibleAsset($id)
    {
        $asset = Asset::findOrFail($id);

        if ($asset->est_ass === 'V') {
            return response()->json([
                'message' => 'El activo ya está visible.',
            ]);
        }

        $asset->update([
            'est_ass' => 'V',
        ]);

        return response()->json([
            'message' => 'Activo visible.',
        ]);
    }

    public function index($rol)
    {

        if ($rol == 'user') {
            $assets = Asset::where('est_ass', 'V')
                ->with(['income', 'category', 'location'])
                ->get();

        } else {

            $assets = Asset::with(['income', 'category', 'location'])->get();
        }
        if ($assets->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron activos'
            ]);
        }

        $transformedAssets = $assets->map(function ($asset) use ($rol) {
            return [
                'id' => $asset->id,
                'id_inc_ass' => $asset->income->id,
                'id_cat_ass' => $asset->category->id,
                'id_loc_ass' => $asset->location->id,
                'income_code' => $asset->income->cod_inc,
                'category_code' => $asset->category->cod_dis,
                'category_name' => $asset->category->nom_dis,
                'location_code' => $asset->location->cod_loc,
                'location_name' => $asset->location->nam_loc,
                'cod_ass' => $asset->cod_ass,
                'ser_num_ass' => $asset->ser_num_ass,
                'obs_add_ass' => $asset->obs_add_ass ?? null,
                'est_ass' => $rol === 'admin' ? $asset->est_ass : null,

            ];
        });
        return response()->json($transformedAssets, 200);
    }



    public function show($id)
    {

        $asset = Asset::with([
            'income:id,cod_inc',
            'category:id,cod_dis,nom_dis',
            'location:id,cod_loc,nam_loc',
            'components:id,cod_com,nam_com'
        ])->findOrFail($id);

        // Mapear los componentes para incluir solo los atributos deseados
        $components = $asset->components->map(function ($component) {
            return [
                'id' => $component->id,
                'cod_com' => $component->cod_com,
                'nam_com' => $component->nam_com,
                'pivot' => [
                    'description' => $component->pivot->description,
                ],
            ];
        });


        $response = [
            'id' => $asset->id,
            'id_inc_ass' => $asset->income->id,
            'id_cat_ass' => $asset->category->id,
            'id_loc_ass' => $asset->location->id,
            'income_code' => $asset->income->cod_inc,
            'category_code' => $asset->category->cod_dis,
            'category_name' => $asset->category->nom_dis,
            'location_code' => $asset->location->cod_loc,
            'location_name' => $asset->location->nam_loc,
            'cod_ass' => $asset->cod_ass,
            'ser_num_ass' => $asset->ser_num_ass,
            'obs_add_ass' => $asset->obs_add_ass ?? null,
            'components' => $components,
        ];

        return response()->json($response);
    }


    public function store(AssetRequest $request)
    {

        try {
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


        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el activo:' . $e], 500);
        }


    }

    public function update(AssetRequest $request, string $id)
    {
        try {

            $validatedData = $request->validated();

            $asset = Asset::findOrFail($id);

            // Obtener los datos actualizados
            $service = $validatedData['asset'];


            $asset->update([
                'id_inc_ass' => $service['id_inc_ass'],
                'id_loc_ass' => $service['id_loc_ass'],
                'cod_ass' => $service['cod_ass'],
                'ser_num_ass' => $service['ser_num_ass'],
                'obs_add_ass' => $service['obs_add_ass'] ?? $asset->obs_add_ass,
            ]);

            // Actualizar la relación con los componentes
            if (isset($service['components'])) {
                $components = collect($service['components'])->mapWithKeys(function ($component) {
                    return [
                        $component['id'] => [
                            'description' => $component['pivot']['description'],
                        ],
                    ];
                });

                $asset->components()->sync($components);
            }


            return response()->json([
                'message' => 'Activo actualizado exitosamente.',
                'asset' => $asset->fresh(),
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar el activo:' . $e], 500);
        }

    }


}