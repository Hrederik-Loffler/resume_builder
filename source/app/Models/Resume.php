<?php

namespace App\Models;

use App\Casts\PublicStorageCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'template_path'];

    /**
     * The appended attributes.
     *
     * @var array
     */
    protected $appends = ['tags'];

    protected $table = "resumes";

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'editorpreview' => PublicStorageCast::class,
    ];

    /**
     * The tags that belong to the resume.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * Resume tags.
     */
    public function getTagsAttribute()
    {
        return $this->tags()->select('name')->get();
    }
}
