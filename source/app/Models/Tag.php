<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    protected $table = "tags";

    /**
     * The fields that should be hidden.
     *
     * @var array
     */
    protected $hidden = ['pivot'];

    public $timestamps = false;

    /**
     * The resumes that belong to the tag.
     */
    public function resumes()
    {
        return $this->belongsToMany(Resume::class);
    }
}
