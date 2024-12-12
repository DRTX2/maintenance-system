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
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp("ended_at")
            ->nullable();// como el created_at de un time_stamp seria un dateTime para saber cuando termino
            $table->string("cod_man",10);
            $table->string("typ_man",40);
            //no estoy seguro de la relacion activo->responsable->mantenimiento

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};
