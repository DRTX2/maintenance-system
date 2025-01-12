<?php

namespace Database\Seeders;

use App\Models\Asset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssetsSeeder extends Seeder
{
    public function run(): void
    {
        Asset::create([
            'id_inc_ass' => 1,
            'id_cat_ass' => 1,
            'id_loc_ass' => 1,
            'cod_ass' => 'ASSET001',
            'ser_num_ass' => 'SERIAL001',
            'obs_add_ass' => 'Viene con un USB de 16 GB adicional',
            'est_ass' => 'V',
        ])->components()->attach([
                    ['component_id' => 1, 'description' => 'Tarjeta Madre ASUS Z490'],
                    ['component_id' => 2, 'description' => 'Procesador Intel Core i7-10700K'],
                    ['component_id' => 3, 'description' => 'RAM Corsair Vengeance LPX 8 GB (2 x 4 GB) DDR4 3200 MHz'],
                    ['component_id' => 4, 'description' => 'RAM Corsair Vengeance LPX 16 GB (2 x 8 GB) DDR4 3200 MHz'],
                    ['component_id' => 5, 'description' => 'Disco Duro Samsung 970 EVO 1TB NVMe SSD'],
                    ['component_id' => 6, 'description' => 'Tarjeta Gráfica NVIDIA GeForce GTX 1660 Ti 6 GB'],
                    ['component_id' => 7, 'description' => 'Fuente de Poder EVGA 600 W'],
                ]);


        Asset::create([
            'id_inc_ass' => 2,
            'id_cat_ass' => 3,
            'id_loc_ass' => 1,
            'cod_ass' => 'ASSET002',
            'ser_num_ass' => 'SERIAL002',
            'obs_add_ass' => 'Incluye un cable de conexión USB adicional',
            'est_ass' => 'V',
        ])->components()->attach([
                    ['component_id' => 9, 'description' => 'Cartucho de Tinta HP 963 XL Color'],
                    ['component_id' => 10, 'description' => 'Cabezal de Impresión HP 963'],
                    ['component_id' => 11, 'description' => 'Rodillo de alimentación de papel'],
                    ['component_id' => 12, 'description' => 'Placa Base HP OfficeJet Pro 9015'],
                ]);
        Asset::create([
            'id_inc_ass' => 3,
            'id_cat_ass' => 5,
            'id_loc_ass' => 1,
            'cod_ass' => 'ASSET003',
            'ser_num_ass' => 'SERIAL003',
            'obs_add_ass' => 'Incluye cable de red adicional.',
            'est_ass' => 'V',
        ])->components()->attach([
                    ['component_id' => 13, 'description' => 'Puerto Ethernet 10/100/1000 Mbps'],
                    ['component_id' => 14, 'description' => 'Chip de Conmutación Broadcom BCM56150'],
                    ['component_id' => 15, 'description' => 'Placa Base Cisco Catalyst 2960-X'],
                ]);

        Asset::create([
            'id_inc_ass' => 4,
            'id_cat_ass' => 4,
            'id_loc_ass' => 1,
            'cod_ass' => 'ASSET004',
            'ser_num_ass' => 'SERIAL004',
            'obs_add_ass' => 'Incluye un adaptador de red',
            'est_ass' => 'V',
        ])->components()->attach([
                    ['component_id' => 1, 'description' => 'Tarjeta Madre ASUS RT-AC68U'],
                    ['component_id' => 8, 'description' => 'Placa de Red TP-Link Archer A7'],
                ]);
        

        $assets = [
            [
                'id_inc_ass' => 5, 
                'id_cat_ass' => 1,
                'id_loc_ass' => 1,
                'cod_ass' => 'ASSET005',
                'ser_num_ass' => 'SERIAL005',
                'obs_add_ass' => 'Activo inicial de hace 3 años.',
                'est_ass' => 'V',
            ],
            [
                'id_inc_ass' => 6, 
                'id_cat_ass' => 2,
                'id_loc_ass' => 2,
                'cod_ass' => 'ASSET006',
                'ser_num_ass' => 'SERIAL006',
                'obs_add_ass' => 'Activo ingresado hace 2.5 años.',
                'est_ass' => 'V',
            ],
            [
                'id_inc_ass' => 7, 
                'id_cat_ass' => 3,
                'id_loc_ass' => 1,
                'cod_ass' => 'ASSET007',
                'ser_num_ass' => 'SERIAL007',
                'obs_add_ass' => 'Activo más reciente, de hace 2 años.',
                'est_ass' => 'V',
            ],
        ];

        foreach ($assets as $asset) {
            Asset::create($asset);
        }
    }
}