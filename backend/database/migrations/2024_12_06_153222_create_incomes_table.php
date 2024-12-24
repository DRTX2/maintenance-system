<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->string('cod_inc', 10)->unique();

            $table->date('date_inc');
            //Open Closed
            $table->enum('est_inc', ['O', 'C'])->default('O');
            $table->foreignId('supplier_id')->constrained()->onUpdate("cascade")->onDelete("restrict");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }
};