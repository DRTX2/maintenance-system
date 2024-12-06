<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
<<<<<<< HEAD
    /**
     * Run the migrations.
     */
=======

>>>>>>> fc8be86625276101af048c257ebd6aafed09090f
    public function up(): void
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
<<<<<<< HEAD
            $table->string("est_ing",1);
        });
    }

    /**
     * Reverse the migrations.
     */
=======
            $table->string("est_inc",1);
            $table->foreignId("id_sup_inc")->constrained("suppliers")->onDelete("cascade");
        });
    }

>>>>>>> fc8be86625276101af048c257ebd6aafed09090f
    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }
};
