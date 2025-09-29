<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request (Login).
     */
public function store(LoginRequest $request)
{
    $request->authenticate();

    $user = $request->user();

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token'    => $token,
        'user'     => [
            'id'       => $user->id,
            'name'     => $user->name,
            'email'    => $user->email,
            'is_admin' => $user->is_admin, 
        ],
    ]);
}


    /**
     * Destroy an authenticated session (Logout).
     */
    public function destroy(Request $request)
    {
        // حذف التوكن الحالي فقط
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
