<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Cart;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $userid)
    {
        $cart = Cart::where('userid', $userid)->with('products')->get();

        $cart->each(function ($cart) {
            $cart->products->firstImage;
        });

        $total = Cart::where('userid', $userid)->sum('total');
    
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $cart,
            'totals' => $total,
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
    public function addToCart(Request $request)
    {
        $cart = Cart::create([
            'userid' => $request->userid,
            'proid' => $request->proid,
            'size' => $request->size,
            'color' => $request->color,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'total' => $request->price * $request->quantity,
            'status' => 1,
            'created_at' => Now(),
            'updateed_at' => Now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $cart 
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cart $cart)
    {
        $cart = Cart::find($request->id);

        $cart->update([
            'quantity' => $request->quantity,
            'total' => $cart->price * $request->quantity,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => $cart,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart, $id)
    {
        $cart = Cart::find($id);

        $cart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'data' => 'success',
        ]);
    }
}
