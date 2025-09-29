<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Apply admin middleware
     */
    public function __construct()
    {
        $this->middleware('admin'); // لازم تكون عامل Middleware للـ admin
    }

    /**
     * Admin Dashboard
     */
    public function dashboard()
    {
        return response()->json([
            'message' => 'Welcome to Admin Dashboard 🚀',
        ]);
    }

    /**
     * Example: Update Theatre Info
     */
    public function updateTheatre(Request $request)
    {
        // هنا تحط لوجيك التعديل على بيانات المسرح
        return response()->json([
            'message' => 'Theatre information updated successfully ✅',
            'data' => $request->all(),
        ]);
    }
}
