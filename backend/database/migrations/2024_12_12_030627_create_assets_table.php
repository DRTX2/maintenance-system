<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId("id_inc_ass")
                ->constrained("incomes")
                ->onUpdate("cascade")
                ->onDelete("restrict");
            $table->foreignId("id_cat_ass")
                ->constrained("categories")
                ->onUpdate("cascade")
                ->onDelete("restrict");
            $table->foreignId("id_loc_ass")
                ->constrained("locations")
                ->onUpdate("cascade")
                ->onDelete("restrict");
            $table->string("cod_ass", 10)->unique();
            $table->string("ser_num_ass", 20)->unique();
            $table->string("obs_add_ass", 50)->nullable();
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};