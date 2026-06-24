<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $userId = $this->userId($request);
        $rows = DB::table('favorites')
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['success' => true, 'data' => $rows]);
    }

    public function store(Request $request)
    {
        $adId = $request->input('ad_id');
        abort_if(! $adId, 422, 'ad_id is required');

        $userId = $this->userId($request);
        DB::table('favorites')->updateOrInsert(
            ['user_id' => $userId, 'ad_id' => $adId],
            ['created_at' => now()]
        );

        return response()->json(['success' => true, 'data' => [
            'user_id' => $userId,
            'ad_id' => $adId,
        ]], 201);
    }

    public function destroy(Request $request, string $adId)
    {
        $deleted = DB::table('favorites')
            ->where('user_id', $this->userId($request))
            ->where('ad_id', $adId)
            ->delete();

        return response()->json(['success' => true, 'data' => [
            'deleted' => (bool) $deleted,
        ]]);
    }

    private function userId(Request $request): int
    {
        $requested = $request->integer('user_id');
        if ($requested) return $requested;

        return (int) DB::table('users')->orderBy('id')->value('id') ?: 1;
    }
}
