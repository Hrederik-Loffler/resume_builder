<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{path?}', \App\Http\Controllers\HomeController::class)->where('path', '^(?!api).*$');

// @TODO: Move these routes to `api.php`.
Route::group(['middleware' => ['web'], 'prefix' => 'api'], function () {
    Route::post('register', [RegisterController::class, "registerUser"]);
    Route::post('login', [LoginController::class, "loginUser"]);
    Route::post('logout', [LoginController::class, "logout"]);
});
