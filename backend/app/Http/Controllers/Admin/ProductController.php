<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $products = Product::latest()->with('firstImage')->get();
        
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $resultString = '';

        if ($request->has('color')) {
            $productDetails = [];
        
            foreach ($request->color as $key => $color) {
                $productDetail = [
                    'size' => $request->size[$key],
                    'color' => $color,
                    'quantity' => $request->quantity[$key],
                ];
                $productDetails[] = $productDetail;
            }

            $resultString = json_encode($productDetails);  
        }

        $product = Product::create([
            'catid' => $request->input('catid'),
            'brandid' => $request->input('brandid'),
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'discount' => $request->input('discount'),
            'description' => $request->input('description'),
            'product_detail' => $resultString,
            'status' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if($product && $request->hasfile('image'))
		{
            foreach ($request->file('image') as $key => $item) {
                $name = time().rand(1,100).'.'. $item->getClientOriginalName();
			    $item->move('C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\product\\', $name);
                $image = \App\Models\Image::create([
                    'proid' => $product->id,
                    'image' => $name,
                ]);
            }
		}
        
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $product,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try {
            $product = Product::where('id',$id)->with('images')->get();

            $product->each(function ($product) {
                $product->product_detail = json_decode($product->product_detail);
            });

            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => $product,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed!',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $product=Product::find($id);

        $resultString = '';

        if ($request->has('color')) {
            $productDetails = [];
        
            foreach ($request->color as $key => $color) {
                $productDetail = [
                    'size' => $request->size[$key],
                    'color' => $color,
                    'quantity' => $request->quantity[$key],
                ];
                $productDetails[] = $productDetail;
            }

            $resultString = json_encode($productDetails);  
        }

        $product->update([
            'catid' => $request->input('catid'),
            'brandid' => $request->input('brandid'),
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'discount' => $request->input('discount'),
            'description' => $request->input('description'),
            'product_detail' => $resultString,
            // 'status'=>(bool)$request->input('status'),
            'updated_at' => now(),
        ]);

        
        if($request->hasfile('image'))
		{
            foreach ($request->file('image') as $key => $item) {
                $name = time().rand(1,100).'.'. $item->getClientOriginalName();
			    $item->move('C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\product\\', $name);
                $image = \App\Models\Image::create([
                    'proid' => $product->id,
                    'image' => $name,
                ]);
            }
		}

        if($request->has('imageRemove')){
            foreach($request->input('imageRemove') as $item ){
                $image = \App\Models\Image::find($item);
                $imagePath = 'C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\product\\' . $image->image;
                if ($image && file_exists($imagePath)) {
                    unlink($imagePath);
                }
                $image->delete();
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        foreach($product->images as $item ){
            $imagePath = 'C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\product\\' . $item->image;
            if ($item->image && file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => 'Delete successful',
        ]);
    }
}