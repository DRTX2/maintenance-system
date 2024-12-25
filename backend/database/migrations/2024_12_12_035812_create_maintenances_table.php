<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp("ended_at")
            ->nullable()
            ->index();
            $table->string("cod_main",10)->unique();
            $table->enum("typ_main",['Preventivo','Correctivo','Predictivo','Adaptativo','Perfectivo']);
            $table->enum("vis_main",['V','H'])->default('V');//visibility_maintenance={visible, hidden}
            $table->string('dni_res_main');
            $table->foreign('dni_res_main')
                ->references('dni_res')
                ->on('responsibles')
                ->onDelete('restrict');
            // añadir tabla activos-mantenimientos, lo ignorare de momento

        });
    }

    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('maintenances');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};
