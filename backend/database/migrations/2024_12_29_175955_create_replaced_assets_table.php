<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('replaced_assets', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('des_rep_ass');
            $table->foreignId('id_ass_bel')
                    ->constrained("assets")
                    ->onDelete("cascade");
            $table->foreignId('id_det_main_bel')
                    ->constrained("maintenance_details")
                    ->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('replaced_assets');
    }
};
