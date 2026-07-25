<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

// Insert real_estate_specs with correct ad_id (cars-1781958151 not real-estate-1781958151)
DB::table('real_estate_specs')->insert([
    'ad_id' => 'cars-1781958151',
    'property_type' => 'Apartment',
    'rooms' => '3 Rooms',
    'bathrooms' => '2 Bath',
    'floor' => 'First Floor',
    'area_text' => '150 sqm',
    'furnished' => 'Unfurnished',
    'building_age' => 'New / Zero'
]);

// Insert real_estate_specs for syr-re ads
$specs = [
    ['syr-re-1', 'apartments'],
    ['syr-re-2', 'apartments'],
    ['syr-re-3', 'apartments'],
];
foreach ($specs as $s) {
    DB::table('real_estate_specs')->insert([
        'ad_id' => $s[0],
        'category_id' => $s[1],
    ]);
}

echo "Real estate specs imported successfully!\n";

echo "\nFinal check:\n";
echo "  ad_details: " . DB::table('ad_details')->count() . "\n";
echo "  car_specs: " . DB::table('car_specs')->count() . "\n";
echo "  real_estate_specs: " . DB::table('real_estate_specs')->count() . "\n";
