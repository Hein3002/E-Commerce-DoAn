<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SalleBill;

class SalleBillController extends Controller
{
    public function order(Request $request){
        try {
            $saleBill = SalleBill::create([
                'userid' => $request->userid,
                'fullname' => $request->fullname,
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'province' => $request->province,
                'district' => $request->district,
                'ward' => $request->ward,
                'street' => $request->street,
                'zip' => $request->zip,
                'moneytotal' => $request->moneytotal,
                'pay' => $request->pay,
                'status' => 1,
                'created_at' => Now(),
                'updated_at' => Now(),
            ]);

            if($request->detail){
                foreach($request->detail as $item){
                    \App\Models\SalleBillDetail::create([
                        'saleid' => $saleBill->id,
                        'name_product' => $item['products']['name'],
                        'size' => $item['size'],
                        'color' => $item['color'],
                        'quantity' => $item['quantity'],
                        'price' => $item['products']['price'],
                        'discount' => $item['products']['discount'],
                        'total' => $item['total'],
                    ]);
                }
            };

            \App\Models\Cart::where('userid',$request->userid)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => 'success'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed!',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getOrder($userid){
        try{
            $order = SalleBill::where('userid', $userid)->latest()->take(1)->get();
            $orderDetail = \App\Models\SalleBillDetail::where('saleid', $order[0]->id)->get();
            return response()->json([
                'success' => true,
                'message' => 'Database connection successful!',
                'data' => [$order, $orderDetail]
            ]);
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed!',
                'error' => $e->getMessage()
            ]);
        }
    }
}
