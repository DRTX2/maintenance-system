<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Component;
class CategoryComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $computerCategory = Category::where('cod_dis', 'D01')->first();
        $componentsForComputer = Component::whereIn('cod_com', ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07'])->get();
        $computerCategory->components()->attach($componentsForComputer);


        $laptopCategory = Category::where('cod_dis', 'D02')->first();
        $componentsForLaptop = Component::whereIn('cod_com', ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C16', 'C17'])->get();
        $laptopCategory->components()->attach($componentsForLaptop);


        $printerCategory = Category::where('cod_dis', 'D03')->first();
        $componentsForPrinter = Component::whereIn('cod_com', ['C09', 'C10', 'C11', 'C12'])->get();
        $printerCategory->components()->attach($componentsForPrinter);


        $routerCategory = Category::where('cod_dis', 'D04')->first();
        $componentsForRouter = Component::whereIn('cod_com', ['C01', 'C08'])->get();
        $routerCategory->components()->attach($componentsForRouter);


        $switchCategory = Category::where('cod_dis', 'D05')->first();
        $componentsForSwitch = Component::whereIn('cod_com', ['C13', 'C14', 'C15'])->get();
        $switchCategory->components()->attach($componentsForSwitch);
    }
}