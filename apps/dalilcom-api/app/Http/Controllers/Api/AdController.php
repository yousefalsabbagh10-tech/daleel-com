<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdController extends Controller
{
    private array $adFields = ['id','owner_user_id','category','title','description','price','currency','location','subcategory','purpose','cover_image_url','is_featured','published_on','owner_phone','whatsapp_phone'];
    private array $columnCache = [];

    public function index(Request $request)
    {
        $query = DB::table('ads')->orderByDesc('created_at');
        $query->when($request->category, fn ($q, $v) => $q->where('category', $v));
        $query->when($request->search, fn ($q, $v) => $q->where('title', 'like', "%$v%")->orWhere('location', 'like', "%$v%"));
        $ads = $query->paginate($request->integer('per_page', 50));
        $ads->getCollection()->transform(fn ($ad) => $this->withRelations($ad));
        return response()->json(['success' => true, 'data' => $ads]);
    }

    public function show(string $id)
    {
        $ad = DB::table('ads')->where('id', $id)->first();
        abort_if(! $ad, 404, 'Ad not found');
        return response()->json(['success' => true, 'data' => $this->withRelations($ad)]);
    }

    public function store(Request $request)
    {
        try { DB::connection()->getPdo(); } catch (\Exception $e) { DB::reconnect(); }
        
        $data = $this->onlyExistingColumns('ads', $request->only($this->adFields));
        $data['id'] ??= ($data['category'] ?? 'ad').'-'.now()->timestamp;
        
        if (!empty($data['cover_image_url'])) {
            $data['cover_image_url'] = $this->saveBase64Image($data['cover_image_url'], $data['id'], '_cover');
        }

        DB::reconnect(); 
        DB::transaction(function () use ($request, $data) {
            DB::table('ads')->insert($data);
            $this->syncChildren($data['id'], $request, $data['cover_image_url'] ?? null);
        });
        return $this->show($data['id']);
    }

    public function update(Request $request, string $id)
    {
        $data = $this->onlyExistingColumns('ads', $request->only(array_diff($this->adFields, ['id'])));
        
        if (!empty($data['cover_image_url'])) {
            $data['cover_image_url'] = $this->saveBase64Image($data['cover_image_url'], $id, '_cover');
        }

        DB::transaction(function () use ($request, $id, $data) {
            if ($data) DB::table('ads')->where('id', $id)->update($data);
            $this->syncChildren($id, $request, $data['cover_image_url'] ?? null);
        });
        return $this->show($id);
    }

    public function destroy(string $id)
    {
        abort_if(! DB::table('ads')->where('id', $id)->delete(), 404, 'Ad not found');
        return response()->json(['success' => true, 'data' => ['deleted' => true]]);
    }

    private function withRelations(object $ad): array
    {
        $carSpecs = DB::table('car_specs')
            ->leftJoin('car_brands', 'car_specs.brand_id', '=', 'car_brands.id')
            ->leftJoin('car_models', 'car_specs.model_id', '=', 'car_models.id')
            ->select('car_specs.*', 'car_brands.ar_name as brand_name', 'car_models.ar_name as model_name')
            ->where('car_specs.ad_id', $ad->id)
            ->first();

        return [
            'ad' => $ad, 
            'images' => DB::table('ad_images')->where('ad_id', $ad->id)->get(), 
            'videos' => DB::table('ad_videos')->where('ad_id', $ad->id)->get(),
            'details' => DB::table('ad_details')->where('ad_id', $ad->id)->get(), 
            'car_specs' => $carSpecs, 
            'real_estate_specs' => DB::table('real_estate_specs')->where('ad_id', $ad->id)->first()
        ];
    }

    private function saveBase64Image(?string $base64String, string $adId, string $suffix = ''): ?string
    {
        if (empty($base64String)) return null;
        if (!str_starts_with($base64String, 'data:image')) return $base64String;

        @list($type, $file_data) = explode(';', $base64String);
        @list(, $file_data) = explode(',', $file_data);
        
        $extension = 'jpg';
        if (str_contains($type, 'png')) $extension = 'png';
        if (str_contains($type, 'gif')) $extension = 'gif';
        if (str_contains($type, 'webp')) $extension = 'webp';

        $fileName = 'ad_'.$adId.'_'.uniqid().$suffix.'.'.$extension;
        $path = public_path('images/ads');
        if (!file_exists($path)) mkdir($path, 0777, true);
        
        file_put_contents($path . '/' . $fileName, base64_decode($file_data));
        
        return url('/images/ads/' . $fileName);
    }

    private function saveBase64Video(?string $base64String, string $adId, string $suffix = ''): ?string
    {
        if (empty($base64String)) return null;
        if (!str_starts_with($base64String, 'data:video')) return $base64String;

        @list($type, $fileData) = explode(';', $base64String);
        @list(, $fileData) = explode(',', $fileData);
        $extension = 'mp4';
        if (str_contains($type, 'webm')) $extension = 'webm';
        if (str_contains($type, 'ogg')) $extension = 'ogv';
        if (str_contains($type, 'quicktime')) $extension = 'mov';

        $fileName = 'ad_'.$adId.'_'.uniqid().$suffix.'.'.$extension;
        $path = public_path('videos/ads');
        if (!file_exists($path)) mkdir($path, 0777, true);
        file_put_contents($path.'/'.$fileName, base64_decode($fileData));

        return url('/videos/ads/'.$fileName);
    }

    private function syncChildren(string $id, Request $request, ?string $coverImageUrl = null): void
    {
        if ($request->has('images')) {
            DB::table('ad_images')->where('ad_id', $id)->delete();
            foreach ($request->input('images', []) as $i => $url) {
                $savedUrl = ($i === 0 && $coverImageUrl) ? $coverImageUrl : $this->saveBase64Image($url, $id, '_img'.$i);
                if ($savedUrl) {
                    DB::table('ad_images')->insert($this->withChildId('ad_images', ['ad_id' => $id, 'image_url' => $savedUrl, 'sort_order' => $i, 'is_cover' => $i === 0]));
                }
            }
        }
        if ($request->has('videos')) {
            DB::table('ad_videos')->where('ad_id', $id)->delete();
            foreach ($request->input('videos', []) as $i => $url) {
                $savedUrl = $this->saveBase64Video($url, $id, '_video'.$i);
                if ($savedUrl) DB::table('ad_videos')->insert($this->withChildId('ad_videos', ['ad_id' => $id, 'video_url' => $savedUrl, 'sort_order' => $i]));
            }
        }
        if ($request->has('details') || $request->has('specs')) {
            DB::table('ad_details')->where('ad_id', $id)->delete();
            $details = $this->mergedDetails($request);
            foreach ($details as $i => $text) DB::table('ad_details')->insert($this->withChildId('ad_details', ['ad_id' => $id, 'detail_text' => $text, 'sort_order' => $i]));
        }
        if ($request->has('specs')) {
            $specs = $request->input('specs', []);
            $category = $request->input('category') ?? DB::table('ads')->where('id', $id)->value('category');
            
            if ($category === 'cars') {
                DB::table('car_specs')->where('ad_id', $id)->delete();
                if (!empty($specs)) {
                    $brandId = DB::table('car_brands')->where('ar_name', $specs['brand'] ?? '')->value('id');
                    $modelId = DB::table('car_models')->where('ar_name', $specs['model'] ?? '')->value('id');

                    DB::table('car_specs')->insert($this->onlyExistingColumns('car_specs', [
                        'ad_id' => $id,
                        'brand_id' => $brandId,
                        'model_id' => $modelId,
                        'model_year' => $specs['year'] ?? null,
                        'transmission' => $specs['gear'] ?? null,
                        'fuel_type' => $specs['fuel'] ?? null,
                        'mileage' => $specs['carMileage'] ?? null,
                        'body_type' => $specs['carBodyType'] ?? null,
                        'car_condition' => $specs['carCondition'] ?? null,
                        'car_type' => $specs['carType'] ?? null,
                        'color' => $specs['carColor'] ?? null,
                        'engine_size' => $specs['engineSize'] ?? null,
                        'engine_power' => $specs['enginePower'] ?? null,
                        'drive_type' => $specs['carDrive'] ?? null,
                        'has_warranty' => $specs['carWarranty'] ?? null,
                        'advertiser_type' => $specs['carAdvertiser'] ?? null,
                    ]));
                }
            } else if ($category === 'real-estate') {
                DB::table('real_estate_specs')->where('ad_id', $id)->delete();
                if (!empty($specs)) {
                    DB::table('real_estate_specs')->insert($this->onlyExistingColumns('real_estate_specs', [
                        'ad_id' => $id,
                        'property_type' => $specs['propType'] ?? null,
                        'rooms' => $specs['reRooms'] ?? null,
                        'bathrooms' => $specs['reBaths'] ?? null,
                        'bedrooms' => $specs['bedsCount'] ?? $specs['reRooms'] ?? null,
                        'bathrooms_count' => $specs['reBaths'] ?? null,
                        'area_text' => $specs['reArea'] ?? null,
                        'area_size' => $specs['minArea'] ?? $specs['projectLandArea'] ?? null,
                        'net_area' => $specs['minNetArea'] ?? null,
                        'floor' => $specs['reFloor'] ?? null,
                        'total_floors' => $specs['buildingTotalFloors'] ?? $specs['projectFloors'] ?? null,
                        'furnished' => $specs['reFurnished'] ?? null,
                        'building_age' => $specs['reBuildingAge'] ?? null,
                        'title_deed_type' => $specs['titleDeedType'] ?? null,
                        'advertiser_type' => $specs['advertiserType'] ?? null,
                        'heating_type' => $specs['heatingType'] ?? null,
                        'property_direction' => $specs['propertyDirection'] ?? null,
                        'has_elevator' => $specs['hasElevator'] ?? null,
                        'has_parking' => $specs['hasParking'] ?? null,
                    ]));
                }
            }
        }
    }

    private function mergedDetails(Request $request): array
    {
        $details = $request->input('details', []);
        $specs = $request->input('specs', []);
        $category = $request->input('category');
        $generated = $category === 'cars' ? [
            $specs['brand'] ?? null, $specs['model'] ?? null, $specs['year'] ?? null,
            $specs['gear'] ?? null, $specs['fuel'] ?? null,
            isset($specs['carMileage']) ? $specs['carMileage'].' كم' : null,
            $specs['carBodyType'] ?? null, $specs['carCondition'] ?? null,
            $specs['carType'] ?? null, $specs['carColor'] ?? null,
            $specs['engineSize'] ?? null, $specs['enginePower'] ?? null,
            $specs['carDrive'] ?? null, $specs['carWarranty'] ?? null,
            $specs['carAdvertiser'] ?? null,
        ] : [
            $specs['propType'] ?? null, $specs['reRooms'] ?? null, $specs['reBaths'] ?? null,
            $specs['reArea'] ?? null, $specs['reFloor'] ?? null, $specs['reFurnished'] ?? null,
            $specs['reBuildingAge'] ?? null, $specs['reType'] ?? null, $specs['projectStatus'] ?? null,
            isset($specs['deliveryYear']) ? 'تسليم '.$specs['deliveryYear'] : null,
            isset($specs['projectFloors']) ? $specs['projectFloors'].' طوابق' : null,
            $specs['projectFinishing'] ?? null,
            isset($specs['projectLandArea']) ? $specs['projectLandArea'].' م² أرض' : null,
            isset($specs['projectUnitsCount']) ? $specs['projectUnitsCount'].' وحدة' : null,
            $specs['buildingTotalFloors'] ?? null, $specs['bedsCount'] ?? null,
            $specs['minNetArea'] ?? null, $specs['maxNetArea'] ?? null,
            $specs['heatingType'] ?? null, $specs['kitchenType'] ?? null,
            $specs['balconyCount'] ?? null, $specs['hasElevator'] ?? null,
            $specs['hasParking'] ?? null, $specs['houseStatus'] ?? null,
            $specs['inComplex'] ?? null, $specs['titleDeedType'] ?? null,
            $specs['propertyDirection'] ?? null, $specs['advertiserType'] ?? null,
            $specs['villaFloors'] ?? null, $specs['landZoning'] ?? null,
            $specs['landFrontage'] ?? null, $specs['officeFitted'] ?? null,
            $specs['shopHasLicense'] ?? null, $specs['minArea'] ?? null,
            $specs['maxArea'] ?? null, $specs['projectType'] ?? null,
            $specs['paymentPlan'] ?? null,
            isset($specs['projectFacilities']) && is_array($specs['projectFacilities']) ? implode(', ', $specs['projectFacilities']) : ($specs['projectFacilities'] ?? null),
            isset($specs['projectAmenities']) && is_array($specs['projectAmenities']) ? implode(', ', $specs['projectAmenities']) : ($specs['projectAmenities'] ?? null),
        ];
        return array_values(array_unique(array_filter(array_map('strval', array_merge($details, $generated)))));
    }

    private function onlyExistingColumns(string $table, array $data): array
    {
        $columns = $this->columns($table);
        return array_intersect_key($data, array_flip($columns));
    }

    private function withChildId(string $table, array $data): array
    {
        if (!in_array('id', $this->columns($table), true) || array_key_exists('id', $data)) {
            return $data;
        }

        $data['id'] = ((int) DB::table($table)->max('id')) + 1;
        return $data;
    }

    private function columns(string $table): array
    {
        if (!isset($this->columnCache[$table])) {
            $this->columnCache[$table] = \Illuminate\Support\Facades\Schema::getColumnListing($table);
        }

        return $this->columnCache[$table];
    }
}
