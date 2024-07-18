<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Brand;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $brand = Brand::latest()->get();
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
        if($request->hasFile('image'))
        {
            $image = $request->file('image');
            $name = time().rand(1,100).'.'. $image->getClientOriginalName();
            $image->move('C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\brand\\', $name);
        }
        else
        {
            $name = null;
        }
    
        $brand = Brand::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image' => $name,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $brand,
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
            $brand = Brand::find($id);
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);

        if($request->hasFile('image'))
        {
            $imagePath = 'C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\brand\\\\' . $brand->image;

            if ($brand->image && file_exists($imagePath)) {
                unlink($imagePath);
            }

            $image = $request->file('image');
            $name = time().rand(1,100).'.'. $image->getClientOriginalName();
            $image->move('C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\brand\\', $name);
        }

        else
        {
            $name = $brand->image;
        }
    
        $brand->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image' => $name,
            'updated_at' => now(),
        ]);
    
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $brand,
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
        $brand = Brand::find($id);
        $imagePath = 'C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\brand\\\\' . $brand->image;

        if ($brand->image && file_exists($imagePath)) {
            unlink($imagePath);
        }

        $brand->delete();

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => 'Delete successful',
        ]);

    }
}
