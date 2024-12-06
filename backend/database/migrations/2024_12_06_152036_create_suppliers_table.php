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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nam_sup",25);
            $table->string("ema_sup",25)->unique();
            $table->string("pho_sup",10);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
