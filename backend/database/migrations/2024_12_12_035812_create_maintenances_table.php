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
            $table->foreignId('id_typ_main')
                ->constrained('type_maintenances')
                ->onDelete('restrict');
            //visibility_maintenance={visible, hidden}
            $table->enum("vis_main",['V','H'])->default('V');
            $table->foreignId('dni_res_main')
                ->constrained('responsibles')
                ->onDelete('restrict');
        });
    }

    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('maintenances');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};
