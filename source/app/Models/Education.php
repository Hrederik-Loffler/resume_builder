<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'school_id', 'degree_id', 'since', 'until'];

    protected $table = "educations";

    /**
     * The appended attributes.
     *
     * @var array
     */
    protected $appends = ['school', 'degree'];

    /**
     * The fields that should be hidden.
     *
     * @var array
     */
    protected $hidden = ['school_id', 'degree_id', 'id', 'user_id'];

    /**
     * The school that belong to the education.
     */
    public function school()
    {
        return $this->belongsTo(School::class);
    }

    /**
     * The degree that belong to the education.
     */
    public function degree()
    {
        return $this->belongsTo(Degree::class);
    }

    /**
     * The user that belong to the education.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Education's school.
     */
    public function getSchoolAttribute()
    {
        return $this->school()->pluck('name')->first();
    }

    /**
     * Education's degree.
     */
    public function getDegreeAttribute()
    {
        return $this->degree()->pluck('name')->first();
    }

    /**
     * Education's user.
     */
    public function getUserAttribute()
    {
        return $this->user()->first();
    }

    public $timestamps = false;
}
