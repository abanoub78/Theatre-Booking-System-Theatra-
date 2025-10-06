<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    public function seat()
        {
            return $this->belongsTo(Seat::class);
        }

    public function screening()
        {
            return $this->belongsTo(Screening::class);
        }

        protected $fillable = [
        'screening_id',
        'seat_id',
        'user_id',
        'show_id',
    ];
}