<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "Real estate ads:\n";
$ids = DB::table('ads')->where('category', 'real-estate')->pluck('id');
foreach ($ids as $id) {
    echo "  - {$id}\n";
}

echo "\nAll ads IDs:\n";
$allIds = DB::table('ads')->pluck('id');
foreach ($allIds as $id) {
    echo "  - {$id}\n";
}
