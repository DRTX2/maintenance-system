<?php

namespace Database\Seeders;

use App\Models\Income;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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
    }
}