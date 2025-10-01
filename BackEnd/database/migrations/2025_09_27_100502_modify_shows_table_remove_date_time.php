<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     public function up(): void
    {
        Schema::table('shows', function (Blueprint $table) {
            $table->dropColumn(['date', 'time']); // نحذف الأعمدة
        });
    }

    public function down(): void
    {
        Schema::table('shows', function (Blueprint $table) {
            $table->date('date')->nullable();
            $table->time('time')->nullable();
        });
    }
    
};
