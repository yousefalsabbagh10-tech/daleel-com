<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CrudController extends Controller
{
    public function __construct(private array $config) {}

    public function index(Request $request)
    {
        $query = DB::table($this->config['table']);
        if ($request->filled('search') && ! empty($this->config['search'])) {
            $query->where(function ($q) use ($request) {
                foreach ($this->config['search'] as $column) {
                    $q->orWhere($column, 'like', '%'.$request->search.'%');
                }
            });
        }
        if (! empty($this->config['order'])) {
            [$column, $dir] = explode(':', $this->config['order']);
            $query->orderBy($column, $dir);
        }
        return response()->json(['success' => true, 'data' => $query->paginate($request->integer('per_page', 50))]);
    }

    public function show(string $id)
    {
        $row = DB::table($this->config['table'])->where($this->config['key'], $id)->first();
        abort_if(! $row, 404, 'Record not found');
        return response()->json(['success' => true, 'data' => $row]);
    }

    public function store(Request $request)
    {
        $data = $request->only($this->config['fillable']);
        abort_if(empty($data), 422, 'No valid fields provided');
        if ($this->config['incrementing'] ?? true) {
            $id = DB::table($this->config['table'])->insertGetId($data);
            return response()->json(['success' => true, 'data' => ['id' => $id] + $data], 201);
        }
        DB::table($this->config['table'])->insert($data);
        return response()->json(['success' => true, 'data' => $data], 201);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->only($this->config['fillable']);
        abort_if(empty($data), 422, 'No valid fields provided');
        DB::table($this->config['table'])->where($this->config['key'], $id)->update($data);
        return $this->show($id);
    }

    public function destroy(string $id)
    {
        $deleted = DB::table($this->config['table'])->where($this->config['key'], $id)->delete();
        abort_if(! $deleted, 404, 'Record not found');
        return response()->json(['success' => true, 'data' => ['deleted' => true]]);
    }
}
