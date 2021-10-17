<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'first_name',
        'second_name',
        'email',
        'password',
        'country',
        'city',
        'phone',
        'accomplishments'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The appended attributes.
     *
     * @var array
     */
    protected $appends = ['educations', 'workExperiences'];

    /**
     * The educations that belong to the user.
     */
    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    /**
     * The work experiences that belong to the user.
     */
    public function workExperiences()
    {
        return $this->hasMany(WorkExperience::class);
    }

    /**
     * User's educations.
     */
    public function getEducationsAttribute()
    {
        return $this->educations()->get();
    }

    /**
     * User's work experiences.
     */
    public function getWorkExperiencesAttribute()
    {
        return $this->workExperiences()->get();
    }
}
