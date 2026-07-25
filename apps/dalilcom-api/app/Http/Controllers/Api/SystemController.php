<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{
    public function health()
    {
        DB::select('SELECT 1');
        return response()->json(['success' => true, 'data' => ['api' => true, 'database' => true]]);
    }

    public function stats()
    {
        $tables = ['ads', 'users', 'car_brands', 'car_models', 'real_estate_categories', 'notifications'];
        $data = collect($tables)->map(fn ($table) => ['name' => $table, 'count' => DB::table($table)->count()]);
        return response()->json(['success' => true, 'data' => $data]);
    }
}
