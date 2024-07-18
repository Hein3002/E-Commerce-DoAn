<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Slide;

class SlideController extends Controller
{
    public function index() {
        try {
            $slide = Slide::latest()->take(6)->get();
            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => $slide
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed!',
                'error' => $e->getMessage()
            ]);
        }
    }
}
