<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('observations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('id_det_main_obs')
                ->constrained('maintenance_details')
                ->onDelete('cascade');
            $table->text('des_obs');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('observations');
    }
};
