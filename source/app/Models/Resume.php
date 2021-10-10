<?php

namespace App\Models;

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
    protected $fillable = ['title', 'description', 'image', 'template_path'];

    protected $table = "resumes";

    /**
     * The tags that belong to the resume.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
