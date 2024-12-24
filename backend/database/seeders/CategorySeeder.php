<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insertando categorías de dispositivos
        Category::create([
            'cod_dis' => 'D01',
            'tip_dis' => 'Informatica',
            'nom_dis' => 'Computadora de escritorio',
        ]);

        Category::create([
            'cod_dis' => 'D02',
            'tip_dis' => 'Informatica',
            'nom_dis' => 'Laptop',
        ]);

        Category::create([
            'cod_dis' => 'D03',
            'tip_dis' => 'Oficina',
            'nom_dis' => 'Impresora',
        ]);

        Category::create([
            'cod_dis' => 'D04',
            'tip_dis' => 'Redes',
            'nom_dis' => 'Router Wi-Fi',
        ]);

        Category::create([
            'cod_dis' => 'D05',
            'tip_dis' => 'Redes',
            'nom_dis' => 'Switch',
        ]);
        Category::create([
            'cod_dis' => 'D06',
            'tip_dis' => 'Informatica',
            'nom_dis' => 'Mouse',
        ]);
        Category::create([
            'cod_dis' => 'D07',
            'tip_dis' => 'Informatica',
            'nom_dis' => 'Teclado',
        ]);
    }
}