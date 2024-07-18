<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\SalleBill;
use App\Models\SalleBillDetail;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \App\Models\User::where('role', 'user')->get();

        $salleBill = \App\Models\SalleBill::all();

        $product = \App\Models\Product::all();

        $outOfStock = 0;

        $product->each(function ($product) use (&$outOfStock) {
            $product_detail = json_decode($product->product_detail);
            foreach ($product_detail as $item) {
                if ($item->quantity < 30) {
                    $outOfStock += 1;
                }
            }
        });

        $lineChart = \App\Models\SalleBill::select(DB::raw('MONTH(created_at) as month'), DB::raw('SUM(moneytotal) as total'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $columChart = \App\Models\SalleBillDetail::select('name_product as name', DB::raw('SUM(quantity) as quantity'))
            ->groupBy('name_product')
            ->orderByDesc(DB::raw('SUM(quantity)'))
            ->take(5)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',

            'statistic' => [
                'user' => $user->count(),
                'outOfStock' => $outOfStock,
                'salleBill' => $salleBill->count(),
                'product' => $product->count()
            ],

            'chart' => [
                'lineChart' => $lineChart,
                'columChart' => $columChart
            ]
        ]);
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
        //
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
        //
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
        //
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
