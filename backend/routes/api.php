<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//User
Route::group(['prefix' => ''], function(){
    Route::get('slide', [\App\Http\Controllers\User\SlideController::class, 'index']);
    Route::get('brand', [\App\Http\Controllers\User\BrandController::class, 'index']);
    Route::get('category', [\App\Http\Controllers\User\CategoryController::class, 'index']);
    Route::get('product/{size}', [\App\Http\Controllers\User\ProductController::class, 'product']);
    Route::post('suggest', [\App\Http\Controllers\User\ProductController::class, 'suggestProduct']);
    Route::get('latestProduct', [\App\Http\Controllers\User\ProductController::class, 'latestProduct']);
    Route::get('detail/{id}', [\App\Http\Controllers\User\ProductController::class, 'productDetail']);
    Route::post('proOfCat', [\App\Http\Controllers\User\ProductController::class, 'productOfCategory']);
});

//User Authenticate
Route::prefix('')->middleware(['auth:sanctum', 'ability:user'])->group(function () {
    Route::get('user', function (Request $request) {
        return response()->json($request->user());
    });
    Route::delete('deleteCart/{id}', [\App\Http\Controllers\User\CartController::class, 'destroy']);
    Route::get('getToCart/{userid}', [\App\Http\Controllers\User\CartController::class, 'index']);
    Route::post('addToCart', [\App\Http\Controllers\User\CartController::class, 'addToCart']);
    Route::post('updateCart', [\App\Http\Controllers\User\CartController::class, 'update']);
    Route::post('order', [\App\Http\Controllers\User\SalleBillController::class, 'order']);
    Route::get('orderDeatil/{userid}', [\App\Http\Controllers\User\SalleBillController::class, 'getOrder']);
});

Route::post('register',[\App\Http\Controllers\AuthenticateController::class, 'register']);

Route::post('login',[\App\Http\Controllers\AuthenticateController::class, 'login']);

Route::prefix('')->middleware(['auth:sanctum'])->group(function () {
    Route::post('logout',[\App\Http\Controllers\AuthenticateController::class, 'logout']);
});

//Admin
Route::prefix('admin')->middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    Route::resource('brand', '\App\Http\Controllers\Admin\BrandController');
    Route::resource('category', '\App\Http\Controllers\Admin\CategoryController');
    Route::resource('product', '\App\Http\Controllers\Admin\ProductController');
    Route::resource('slide', '\App\Http\Controllers\Admin\SlideController');
    Route::resource('sallebill', '\App\Http\Controllers\Admin\SalleBillController');
    Route::resource('dashboard', '\App\Http\Controllers\Admin\DashboardController');
});