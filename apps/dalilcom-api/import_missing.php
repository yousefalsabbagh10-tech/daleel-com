<?php
/**
 * Script to import missing tables (ad_details, car_specs, real_estate_specs)
 * Run: php import_missing.php
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "Importing missing tables...\n";

// ====== AD DETAILS ======
$adDetails = [];
// syr-car-1 details
$adDetails[] = [1, 'syr-car-1', '225000', 0];
$adDetails[] = [2, 'syr-car-1', '2008', 1];
$adDetails[] = [3, 'syr-car-1', 'Automatic', 2];
$adDetails[] = [4, 'syr-car-1', 'Hyundai', 3];
$adDetails[] = [5, 'syr-car-1', 'Petrol', 4];
$adDetails[] = [6, 'syr-car-1', 'SUV', 5];
$adDetails[] = [7, 'syr-car-1', 'AWD', 6];
$adDetails[] = [8, 'syr-car-1', 'White', 7];
$adDetails[] = [9, 'syr-car-1', 'Used', 8];
// syr-car-2 details
$adDetails[] = [10, 'syr-car-2', '156000', 0];
$adDetails[] = [11, 'syr-car-2', '2012', 1];
$adDetails[] = [12, 'syr-car-2', 'Automatic', 2];
$adDetails[] = [13, 'syr-car-2', 'Kia', 3];
$adDetails[] = [14, 'syr-car-2', 'Petrol', 4];
$adDetails[] = [15, 'syr-car-2', 'Sedan', 5];
$adDetails[] = [16, 'syr-car-2', 'Gray', 6];
$adDetails[] = [17, 'syr-car-2', 'Used', 7];
// syr-car-3 details
$adDetails[] = [18, 'syr-car-3', '180000', 0];
$adDetails[] = [19, 'syr-car-3', '2010', 1];
$adDetails[] = [20, 'syr-car-3', 'Automatic', 2];
$adDetails[] = [21, 'syr-car-3', 'Hyundai', 3];
$adDetails[] = [22, 'syr-car-3', 'Petrol', 4];
$adDetails[] = [23, 'syr-car-3', 'Sedan', 5];
$adDetails[] = [24, 'syr-car-3', 'Silver', 6];
$adDetails[] = [25, 'syr-car-3', 'Used', 7];
// syr-car-4 details
$adDetails[] = [26, 'syr-car-4', '120000', 0];
$adDetails[] = [27, 'syr-car-4', '2018', 1];
$adDetails[] = [28, 'syr-car-4', 'Automatic', 2];
$adDetails[] = [29, 'syr-car-4', 'Toyota', 3];
$adDetails[] = [30, 'syr-car-4', 'Petrol', 4];
$adDetails[] = [31, 'syr-car-4', 'Sedan', 5];
$adDetails[] = [32, 'syr-car-4', 'Black', 6];
$adDetails[] = [33, 'syr-car-4', 'Used', 7];
// syr-re-1 details
$adDetails[] = [34, 'syr-re-1', '3 Rooms + Hall', 0];
$adDetails[] = [35, 'syr-re-1', '2 Bathrooms', 1];
$adDetails[] = [36, 'syr-re-1', 'Floor 3', 2];
$adDetails[] = [37, 'syr-re-1', 'Super Deluxe', 3];
$adDetails[] = [38, 'syr-re-1', 'Fully Furnished', 4];
// syr-re-2 details
$adDetails[] = [39, 'syr-re-2', '5 Bedrooms', 0];
$adDetails[] = [40, 'syr-re-2', '6 Bathrooms', 1];
$adDetails[] = [41, 'syr-re-2', 'Two Floors', 2];
$adDetails[] = [42, 'syr-re-2', 'Private Well', 3];
$adDetails[] = [43, 'syr-re-2', 'Pool with Filter', 4];
// syr-re-3 details
$adDetails[] = [44, 'syr-re-3', '3 Bedrooms', 0];
$adDetails[] = [45, 'syr-re-3', 'Living+Kitchen', 1];
$adDetails[] = [46, 'syr-re-3', 'Green Tabo', 2];
$adDetails[] = [47, 'syr-re-3', 'Floor 2+Elevator', 3];
$adDetails[] = [48, 'syr-re-3', 'North-Facing', 4];
// laravel-test-ad-1 details
$adDetails[] = [49, 'laravel-test-ad-1', 'Model 2026', 0];
$adDetails[] = [50, 'laravel-test-ad-1', 'Test', 1];
// common car details for test ads
$adDetails[] = [66, 'cars-1782129548', 'Toyota', 0];
$adDetails[] = [67, 'cars-1782129548', 'Camry', 1];
$adDetails[] = [68, 'cars-1782129548', '2024', 2];
$adDetails[] = [69, 'cars-1782129548', 'Automatic', 3];
$adDetails[] = [70, 'cars-1782129548', 'Petrol', 4];
$adDetails[] = [71, 'cars-1782129548', '30000', 5];
$adDetails[] = [72, 'cars-1782129548', 'Sedan', 6];
$adDetails[] = [73, 'cars-1782129548', 'Clean Used', 7];
$adDetails[] = [74, 'cars-1782129548', 'For Sale', 8];
$adDetails[] = [75, 'cars-1782129548', 'White', 9];
$adDetails[] = [76, 'cars-1782129551', 'Toyota', 0];
$adDetails[] = [77, 'cars-1782129551', 'Camry', 1];
$adDetails[] = [78, 'cars-1782129551', '2024', 2];
$adDetails[] = [79, 'cars-1782129551', 'Automatic', 3];
$adDetails[] = [80, 'cars-1782129551', 'Petrol', 4];
$adDetails[] = [81, 'cars-1782129551', '30000', 5];
$adDetails[] = [82, 'cars-1782129551', 'Sedan', 6];
$adDetails[] = [83, 'cars-1782129551', 'Clean Used', 7];
$adDetails[] = [84, 'cars-1782129551', 'For Sale', 8];
$adDetails[] = [85, 'cars-1782129551', 'White', 9];
$adDetails[] = [91, 'cars-1782131819', 'Toyota', 0];
$adDetails[] = [92, 'cars-1782131819', 'Camry', 1];
$adDetails[] = [93, 'cars-1782131819', '2024', 2];
$adDetails[] = [94, 'cars-1782131819', 'Automatic', 3];
$adDetails[] = [95, 'cars-1782131819', 'Petrol', 4];
$adDetails[] = [96, 'cars-1782131819', '30000', 5];
$adDetails[] = [97, 'cars-1782131819', 'Sedan', 6];
$adDetails[] = [98, 'cars-1782131819', 'Clean Used', 7];
$adDetails[] = [99, 'cars-1782131819', 'For Sale', 8];
$adDetails[] = [100, 'cars-1782131819', 'White', 9];

foreach ($adDetails as $d) {
    DB::table('ad_details')->insert([
        'id' => $d[0], 'ad_id' => $d[1], 'detail_text' => $d[2], 'sort_order' => $d[3]
    ]);
}
echo "✓ Ad details imported (" . count($adDetails) . ")\n";

// ====== CAR SPECS ======
$carSpecs = [
    ['cars-1781954035', 12, 386, 2024, 'Automatic', 'Petrol', 30000, 'Sedan', 'Clean Used', 'For Sale', 'White'],
    ['cars-1781954037', 12, 386, 2024, 'Automatic', 'Petrol', 30000, 'Sedan', 'Clean Used', 'For Sale', 'White'],
    ['cars-1781959026', 12, 386, 2024, 'Automatic', 'Petrol', 30000, 'Sedan', 'Clean Used', 'For Sale', 'White'],
    ['cars-1782129548', 12, 386, 2024, 'Automatic', 'Petrol', 30000, 'Sedan', 'Clean Used', 'For Sale', 'White'],
    ['cars-1782129551', 12, 386, 2024, 'Automatic', 'Petrol', 30000, 'Sedan', 'Clean Used', 'For Sale', 'White'],
    ['cars-1782131819', 12, 386, 2024, 'Automatic', 'Petrol', 30000, 'Sedan', 'Clean Used', 'For Sale', 'White'],
    ['syr-car-1', 1, null, 2008, null, null, null, 'SUV', null, null, null],
    ['syr-car-2', 2, null, 2012, null, null, null, null, null, null, null],
    ['syr-car-3', 1, null, 2010, null, null, null, null, null, null, null],
    ['syr-car-4', 12, null, 120000, null, null, null, null, null, null, null],
];
foreach ($carSpecs as $cs) {
    DB::table('car_specs')->insert([
        'ad_id' => $cs[0], 'brand_id' => $cs[1], 'model_id' => $cs[2],
        'model_year' => $cs[3], 'transmission' => $cs[4], 'fuel_type' => $cs[5],
        'mileage' => $cs[6], 'body_type' => $cs[7], 'car_condition' => $cs[8],
        'car_type' => $cs[9], 'color' => $cs[10]
    ]);
}
echo "✓ Car specs imported (" . count($carSpecs) . ")\n";

// ====== REAL ESTATE SPECS ======
$reSpecs = [
    ['cars-1781958151', null, null, 'Apartment', '3 Rooms', '2 Bath', null, null, 'First Floor', null, '150 sqm', null, null, 'Unfurnished', 'New / Zero'],
    ['syr-re-1', 'apartments', null, null, null, null, null, null, null, null, null, null, null, null, null],
    ['syr-re-2', 'apartments', null, null, null, null, null, null, null, null, null, null, null, null, null],
    ['syr-re-3', 'apartments', null, null, null, null, null, null, null, null, null, null, null, null, null],
];
foreach ($reSpecs as $rs) {
    DB::table('real_estate_specs')->insert([
        'ad_id' => $rs[0], 'category_id' => $rs[1], 'subcategory_id' => $rs[2],
        'property_type' => $rs[3], 'rooms' => $rs[4], 'bathrooms' => $rs[5],
        'bedrooms' => $rs[6], 'bathrooms_count' => $rs[7], 'floor' => $rs[8],
        'total_floors' => $rs[9], 'area_text' => $rs[10], 'area_size' => $rs[11],
        'net_area' => $rs[12], 'furnished' => $rs[13], 'building_age' => $rs[14]
    ]);
}
echo "✓ Real estate specs imported (" . count($reSpecs) . ")\n";

// ====== COMPLETE SUMMARY ======
echo "\n✅ All missing data imported successfully!\n";
echo "Final tables summary:\n";
$tables = ['countries','users','default_limits','user_limits','car_brands','car_models','real_estate_categories','real_estate_subcategories','ads','ad_images','ad_videos','ad_details','car_specs','real_estate_specs','notifications','valuation_reports','app_settings'];
foreach ($tables as $t) {
    echo "  {$t}: " . DB::table($t)->count() . "\n";
}
