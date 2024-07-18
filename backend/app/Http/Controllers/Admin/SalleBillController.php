<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SalleBill;
use Illuminate\Http\Request;

class SalleBillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        try {
            $salleBill = SalleBill::latest()->get();
            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => $salleBill
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
        foreach ($request->data as $key => $id) {
            $salleBill = SalleBill::find($id);
            
            if ($request->action === 'confirm') {
                $salleBill->update([
                    'status' => 2,
                ]);
            }
            elseif ($request->action === 'cancel') {
                $salleBill->update([
                    'status' => 4,
                ]);
            }
            elseif ($request->action === 'delete') {
                $salleBill->delete();
            }
        };

        $salleBill = SalleBill::latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $salleBill
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
        $salleBill = SalleBill::find($id);
        $salleBillDetail = \App\Models\SalleBillDetail::where('saleid', $salleBill->id)->get();
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => ['salleBill' => $salleBill,
                       'salleBillDetail' => $salleBillDetail]
        ]);
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
        $salleBill = SalleBill::find($id);

        $salleBill->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $salleBill
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
        //
    }
}
