<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['job_id', 'since', 'until', 'responsibilities', 'user_id'];

    /**
     * The fields that should be hidden.
     *
     * @var array
     */
    protected $hidden = ['job_id', 'id', 'user_id'];

    /**
     * The appended attributes.
     *
     * @var array
     */
    protected $appends = ['title'];

    /**
     * The job that belong to the work experience.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    /**
     * Work experience's job.
     */
    public function getTitleAttribute()
    {
        return $this->job()->pluck('name')->first();
    }

    public $timestamps = false;
}
