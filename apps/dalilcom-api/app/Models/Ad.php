<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    protected $guarded = [];
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $casts = [
        'details' => 'array',
        'image_urls' => 'array',
        'attributes' => 'array',
        'is_featured' => 'boolean',
    ];
}
