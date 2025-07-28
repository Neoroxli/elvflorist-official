<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bucket extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ["id"];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class);
    }
}
