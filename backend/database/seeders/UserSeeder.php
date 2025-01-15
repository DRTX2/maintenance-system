<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        User::create([
            "name" => "Josue Garcia",
            "email" => "josue@gmail.com",
            "password" => Hash::make("josue123"),
            "role" => "admin",
            "dni_usr" => "1712780756"
        ]);

        User::create([
            "name" => "David Manjarres",
            "email" => "david@gmail.com",
            "password" => Hash::make("david123"),
            "role" => "user",
            "dni_usr" => "1716909690"
        ]);

        User::create([
            "name"=> "Administrador base",
            "email" => "admin@gmail.com",
            "password"=> Hash::make("admin123"),
            "role"=> "admin",
            "dni_usr"=> "1111111111"
        ]);
    }
}