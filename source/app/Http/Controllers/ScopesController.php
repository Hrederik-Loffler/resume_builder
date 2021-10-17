<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class ScopesController extends Controller
{
    public function list()
    {
        return response()->json(
            Permission::where('guard_name', 'web')->get()
        );
    }
}
