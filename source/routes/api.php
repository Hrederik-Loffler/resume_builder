<?php

use App\Http\Controllers\ResumesController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScopesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Auth::routes();

Route::group(["prefix" => "/resumes"], function () {
    Route::get("/", [ResumesController::class, "index"]);
    Route::get("/{id}", [ResumesController::class, "show"]);
    Route::post("/", [ResumesController::class, "store"]);
    Route::post("/{id}", [ResumesController::class, "update"]);
    Route::get("/{id}/details", [ResumesController::class, "getDetails"]);
    Route::put("/{id}/details", [ResumesController::class, "updateDetails"]);
});

Route::group(['prefix' => 'role'], function () {
   Route::get('list', [RoleController::class, 'list']);
   Route::get('{role}', [RoleController::class, 'role']);
});

Route::group(['prefix' => 'user'], function () {
    Route::get('me', UserController::class);
    Route::get('/all', [UserController::class, 'allUsers']);
    Route::get('{user}', [UserController::class, 'user']);
    Route::patch('{user}', [UserController::class, 'updateRole']);
});

Route::group(['prefix' => 'scope'], function () {
   Route::get('list', [ScopesController::class, 'list']);
});
