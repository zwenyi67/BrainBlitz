<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::guard('admin')->attempt($data)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }

        $admin = Auth::guard('admin')->user();

        // Create a token for the authenticated admin

        $token = $admin->createToken('main')->plainTextToken;
        //$token = '3930933';

        return response()->json([
            'user' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
            ],
            'token' => $token,
            'role' => 'admin',
        ]);
    }

    public function logout(Request $request) {
        
        $admin = $request->user();

        $admin->currentAccessToken()->delete();

        return response('',204);
    }
}
