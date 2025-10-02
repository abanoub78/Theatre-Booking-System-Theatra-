<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
public function getReservedSeats()
{
    return Reservation::all(); 
}
public function reserveSeats(Request $request)
    {
        $validated = $request->validate([
            'screening_id' => 'required|exists:screenings,id',
            'seat_ids' => 'required|array|min:1',
            'seat_ids.*' => 'integer|exists:seats,id',
            'user_id' => 'required',
        ]);
        $screening_id = $validated['screening_id'];
        $seat_ids = $validated['seat_ids'];
        $user_id = $validated['user_id'];

        $alreadyReserved = Reservation::where('screening_id', $screening_id)
            ->whereIn('seat_id', $seat_ids)
            ->pluck('seat_id')
            ->toArray();

        if (count($alreadyReserved)) {
            return response()->json([
                'message' => 'error while booking',
                'reserved' => $alreadyReserved
            ], 409);
        }
        foreach ($seat_ids as $seat_id) {
            Reservation::create([
                'screening_id' => $screening_id,
                'seat_id' => $seat_id,
                'user_id' => $user_id,
            ]);
        }
        return response()->json([
            'message' => ' done '
        ], 201);
    }
}