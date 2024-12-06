<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    
    public function run(): void
    {
        Supplier::create([
            'nam_sup' => 'Proveedor Uno',
            'ema_sup' => 'proveedor1@example.com',
            'pho_sup' => '1234567890',
        ]);

        Supplier::create([
            'nam_sup' => 'Proveedor Dos',
            'ema_sup' => 'proveedor2@example.com',
            'pho_sup' => '0987654321',
        ]);
    }
}
