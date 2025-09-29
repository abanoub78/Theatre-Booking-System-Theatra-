<?php

namespace App\Http\Controllers;
use App\Models\Seat;

use Illuminate\Http\Request;

class SeatController extends Controller
{
    public function apiSeats($screeningId)
        {
            $seats = Seat::with(['reservations' => function ($query) use ($screeningId) {
                $query->where('screening_id', $screeningId);
            }])->get();

            $seats = $seats->map(function ($seat) {
                return [
                    'id' => $seat->id,
                    'title' => $seat->seat_title,
                    'degree' => $seat->seat_degree,
                    'is_reserved' => !$seat->reservations->isEmpty(),
                ];
            });

            return response()->json($seats);
        }

        public function allSeats()
        {
            return Seat::all(); 
        }
}
