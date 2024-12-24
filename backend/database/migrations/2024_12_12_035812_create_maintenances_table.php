<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            $table->string("cod_main",10);
            $table->string("typ_main",40);
            //no estoy seguro de la relacion activo->responsable->mantenimiento
            $table->string('dni_res_main');
            $table->foreign('dni_res_main')
                ->references('dni_res')
                ->on('responsibles')
                ->onDelete('restrict');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('maintenances');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};
