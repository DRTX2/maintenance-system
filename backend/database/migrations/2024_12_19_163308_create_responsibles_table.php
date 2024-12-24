<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('responsibles', function (Blueprint $table) {
            $table->id("dni_res");
            $table->timestamps();
            $table->string("nam_res");
            $table->string("pho_res",10);
            $table->string("is_ext_res",2);
            // $table->string("typ_res",2);
	    $table->string("ema_res")->unique();
	    $table->string("extra");
            // debo completar los modelos, controladores para mantenimiento-responsable, de paso crear terminar la foreign key
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responsibles');
    }
};
