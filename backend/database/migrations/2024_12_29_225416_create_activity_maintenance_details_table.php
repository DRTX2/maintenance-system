<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_maintenance_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId("id_main")->constrained("maintenance_details")->onDelete("cascade");
            $table->foreignId("id_act")->constrained("activities")->onDelete("cascade");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_maintenance_details');
    }
};
