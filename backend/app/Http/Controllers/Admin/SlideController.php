<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Slide;

class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $slide = Slide::latest()->get();
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
            $image->move('C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\slide\\', $name);
        }
        else
        {
            $name = null;
        }
    
        $slide = Slide::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image' => $name,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $slide,
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
            $slide = Slide::find($id);
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $slide = Slide::find($id);

        if($request->hasFile('image'))
        {
            $imagePath = 'C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\slide\\' . $slide->image;

            if ($slide->image && file_exists($imagePath)) {
                unlink($imagePath);
            }

            $image = $request->file('image');
            $name = time().rand(1,100).'.'. $image->getClientOriginalName();
            $image->move('C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\slide\\', $name);
        }

        else
        {
            $name = $slide->image;
        }
    
        $slide->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image' => $name,
            'updated_at' => now(),
        ]);
    
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $slide,
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
        $slide = Slide::find($id);
        $imagePath = 'C:\Users\Hien\Desktop\Công Nghệ Web Và Ứng Dụng\Công Nghệ Web Và Ứng Dụng\frontend\public\images\slide\\' . $slide->image;

        if ($slide->image && file_exists($imagePath)) {
            unlink($imagePath);
        }

        $slide->delete();

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => 'Delete successful',
        ]);
    }
}
