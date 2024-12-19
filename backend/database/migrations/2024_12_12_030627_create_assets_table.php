<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {// assets=activos
            $table->id();
            $table->timestamps();
            $table->foreignId("id_inc_ass")
            ->constrained("incomes")
            ->onUpdate("cascade")
            ->onDelete("cascade");// si se elimina el ingreso tambien los activos
            $table->foreignId("id_cat_ass")
            ->constrained("categories")
            ->onUpdate("cascade")
            ->onDelete("restrict");// evitar eliminar una categoria si tiene activo asociado
            $table->foreignId("id_loc_ass")
            ->constrained("locations")
            ->onUpdate("cascade")
            ->onDelete("restrict");
            $table->string("cod_ass",10);
            $table->string("ser_num_ass",10);//serial number asset
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
