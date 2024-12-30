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
        Schema::create('maintenance_details', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            //id_maintenance_belongs
            $table->foreignId('id_main_bel')
                    ->constrained("maintenances")
                    ->onDelete("cascade"); 
            //id_asset_belongs
            $table->foreignId('id_ass_bel') 
                    ->constrained("assets")
                    ->onDelete("cascade");
            // $table->enum("prev_sta_main", ["nuevo","viejo"])->default("nuevo");
            // $table->enum("prev_sta_main", ["nuevo","viejo"])->default("nuevo");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_details');
    }
};
