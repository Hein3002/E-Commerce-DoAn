<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function latestProduct() {
        try {
            $products = Product::latest()->with('firstImage')->take(15)->get();
        
            $products->each(function ($product) {
                $product->product_detail = json_decode($product->product_detail);
            });

            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => $products
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed!',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function product($size) {
        try {
            $products = Product::with('firstImage')->paginate($size);            
                        
            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => $products 
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed!',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function productDetail($id){
        try {
            $product = Product::with('firstImage')->find($id);

            $product_related = Product::where('catid', $product->catid)->with('firstImage')->get();

            $product_related->each(function ($product_related) {
                $product_related->product_detail = json_decode($product_related->product_detail);
                $product_related->brandid = $product_related->brands->name;
                $product_related->catid = $product_related->categories->name;
            });

            $product->images;
            $product->brandid = $product->brands->name;
            $product->catid = $product->categories->name;
            $product->product_detail = json_decode($product->product_detail);

            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => [$product, $product_related]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed!',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function suggestProduct(Request $request){
        $suggest=[];
        $query= Product::query()->with('firstImage');
        if($request->name.trim('')){
            $suggest=$query->where("name","like","%" .$request->name."%")->get();
        }    
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $suggest
        ]);
    }

    public function productOfCategory(Request $request){       
        $product = Product::where('catid',$request->id)->with('firstImage')->get(); 
        $product->each(function( $product){
            $product->catid=$product->categories->name;
            $product->brandid=$product->brands->name;
        });           
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $product
        ]);
    }
}
