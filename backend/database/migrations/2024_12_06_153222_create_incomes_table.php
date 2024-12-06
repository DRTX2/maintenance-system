<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("est_inc",1);
            $table->foreignId("id_sup_inc")->constrained("suppliers")->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }
};