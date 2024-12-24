<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('responsibles', function (Blueprint $table) {
            $table->string('dni_res')->primary();// no se como ponerlo para q sea un varchar como primary keey
            $table->timestamps();
            $table->string("nam_res");
            $table->string("las_res");//lastname
            $table->string("ema_res")->unique();
            $table->string("pho_res")->unique();
            // is externa{Yes,No}
            $table->enum('is_ext', ['Y', 'N'])->default('N');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('responsibles');
    }
};
