<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index() {
        try {
            $category = Category::latest()->take(8)->get();
            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => $category
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
