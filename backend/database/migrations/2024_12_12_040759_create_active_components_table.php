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
        Schema::create('active_components', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("des_act_com",50);
            $table->foreignId("id_com")
            ->constrained("components")
            ->onDelete("restrict");
            // no vi bien el diagrama, toca crear primero la tabla d comopnentes d reemplazo
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('active_components_talbe');
    }
};
