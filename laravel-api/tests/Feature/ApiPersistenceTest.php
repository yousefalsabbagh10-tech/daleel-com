<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ApiPersistenceTest extends TestCase
{
    public function test_ad_post_is_persisted_in_mysql(): void
    {
        $id = 'phpunit-laravel-ad-1';
        DB::table('ads')->where('id', $id)->delete();

        $response = $this->postJson('/api/ads', [
            'id' => $id,
            'category' => 'cars',
            'title' => 'PHPUnit Laravel Ad',
            'price' => 777,
            'currency' => '$',
            'location' => 'Damascus Test',
            'cover_image_url' => 'https://example.com/phpunit.jpg',
            'published_on' => '2026-06-20',
            'images' => ['https://example.com/phpunit.jpg'],
            'details' => ['stored by laravel test'],
        ]);

        $response->assertOk()->assertJsonPath('success', true);
        $this->assertDatabaseHas('ads', ['id' => $id, 'title' => 'PHPUnit Laravel Ad']);
        $this->assertDatabaseHas('ad_images', ['ad_id' => $id]);
        $this->assertDatabaseHas('ad_details', ['ad_id' => $id]);

        DB::table('ads')->where('id', $id)->delete();
    }
}
