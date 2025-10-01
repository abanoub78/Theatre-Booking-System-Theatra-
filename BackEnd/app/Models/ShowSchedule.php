<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShowSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'show_id',
        'date',
        'time',
    ];

    // العلاقة مع جدول العروض
    public function show()
    {
        return $this->belongsTo(Show::class);
    }
}
    