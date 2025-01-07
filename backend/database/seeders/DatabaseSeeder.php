<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SupplierSeeder::class,
            LocationSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            ComponentSeeder::class,
            CategoryComponentSeeder::class,
            IncomeSeeder::class,
            TypeMaintenanceSeeder::class,
            ResponsibleSeeder::class,
            AssetsSeeder::class,
            MaintenanceSeeder::class,
        ]);


    }
}