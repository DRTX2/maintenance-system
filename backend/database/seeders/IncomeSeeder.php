<?php

namespace Database\Seeders;

use App\Models\Income;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
{
    public function run(): void
    {
        Income::create([
            'cod_inc' => 'INC001',
            'date_inc' => Carbon::now()->format('Y-m-d'),
            'est_inc' => 'O',
            'supplier_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),

        ]);
        Income::create([
            'cod_inc' => 'INC002',
            'date_inc' => Carbon::now()->subDays(5)->format('Y-m-d'),
            'est_inc' => 'O',
            'supplier_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Income::create([
            'cod_inc' => 'INC003',
            'date_inc' => Carbon::now()->subDays(10)->format('Y-m-d'),
            'est_inc' => 'C',
            'supplier_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Income::create([
            'cod_inc' => 'INC004',
            'date_inc' => Carbon::now()->subDays(2)->format('Y-m-d'),
            'est_inc' => 'O',
            'supplier_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}