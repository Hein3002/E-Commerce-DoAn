<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Brand;

class BrandController extends Controller
{
    public function index() {
        try {
            $brand = Brand::latest()->take(6)->get();
            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => $brand
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
