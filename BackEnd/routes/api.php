<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ScreeningController;


Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Route::get('shows', [ShowController::class, 'index']);
// Route::get('shows/{id}', [ShowController::class, 'show']);
Route::apiResource('shows', ShowController::class);
Route::get('/seats', [SeatController::class, 'allSeats']);                                   //mustafa
Route::get('/reservations', [ReservationController::class, 'getReservedSeats']);             //mustafa
Route::post('/reservations', [ReservationController::class, 'reserveSeats']);                //mustafa
Route::get('/screenings/{show_id}', [ScreeningController::class, 'getScreeningStartTime']); //mustafa
Route::get('/reservations/{show_id}/{screening_id}', [ReservationController::class, 'getSeatId']);             //mustafa

Route::post('/shows', [ShowController::class, 'store']);
Route::put('/shows/{id}', [ShowController::class, 'update']);
Route::delete('/shows/{id}', [ShowController::class, 'destroy']);
    
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

  
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('shows', [ShowController::class, 'index']);
    Route::get('shows/{id}', [ShowController::class, 'show']);
});
