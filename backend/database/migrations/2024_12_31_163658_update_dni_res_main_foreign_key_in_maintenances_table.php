<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('maintenances', function (Blueprint $table) {
            $table->dropForeign(['dni_res_main']);

            $table->string('dni_res_main')->change();

            $table->foreign('dni_res_main')
                ->references('dni_res')
                ->on('responsibles')
                ->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::table('maintenances', function (Blueprint $table) {
            $table->dropForeign(['dni_res_main']);
            // Restaurar el tipo de la columna
            $table->unsignedBigInteger('dni_res_main')->change();
            // Restaurar la clave foránea original
            $table->foreign('dni_res_main')
                ->references('id') // Restaurar al predeterminado
                ->on('responsibles')
                ->onDelete('restrict');
            });
    }
};
