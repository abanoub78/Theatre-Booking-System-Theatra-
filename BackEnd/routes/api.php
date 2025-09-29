<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\SeatController;


Route::post('/register', [RegisteredUserController::class, 'store']);

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Route::get('/shows', [ShowController::class, 'index']);      // get all shows
// Route::get('/shows/{id}', [ShowController::class, 'show']);  // get single show
// Route::post('/shows', [ShowController::class, 'store']); // optional for admin


Route::apiResource('shows', ShowController::class);
Route::get('/seats', [SeatController::class, 'allSeats']);

