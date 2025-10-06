<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Screening;
class ScreeningController extends Controller
{
    public function getScreeningStartTime($show_id)
{
    // $startTimes = Screening::where('show_id', $show_id)->pluck('start_time');
    // return $startTimes ;
    return Screening::where('show_id', $show_id)
                    ->select('id', 'start_time')
                    ->get();
}
}
