<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class AuthenticateController extends Controller
{
    public function register(Request $request) {
        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'role' => 'user',
            'password' => bcrypt($request->password),
        ]);

        if($user){
            return response()->json([
                'success' => true,
                'data' => $user,
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'error' => "Registration failed"
            ],404);
        }
    }

    public function login(Request $request){
        $data = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if(auth()->attempt($data)){
            $user = auth()->user();
            return response()->json([
                'success' => true,
                'id' => $user->id,
                'role' => $user->role,
                'token' => $user->createToken('API TOKEN',[$user->role])->plainTextToken,
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'error' => "Login failed"
            ],401);
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
        ],200);
    }
}
