<?php

namespace App\Http\Requests\Resumes;

use App\Rules\PhoneRule;
use Illuminate\Contracts\Session\Session;
use Illuminate\Foundation\Http\FormRequest;

class ResumesGenerateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'string|max:255',
            'second_name' => 'string|max:255',

            'location.country' => 'string|max:255',
            'location.city' => 'string|max:255',
            'location.street' => 'string|max:255',

            'email' => 'email|max:255',
            'phone' => new PhoneRule,
            'job_title' => 'string|max:255',
            'summary' => 'string|max:1024',

            'employment' => 'array|max:4',
            'employment.title' => 'string|max:255',
            'employment.employer' => 'string|max:255',
            'employment.since' => 'date',
            'employment.until' => 'date',
            'employment.city' => 'string|max:255',
            'employment.description' => 'string|max:1024',

            'education' => 'array|max:4',
            'education.school' => 'string|max:255',
            'education.degree' => 'string|max:255',
            'education.since' => 'date',
            'education.until' => 'date',
            'education.city' => 'string|max:255',
            'education.description' => 'string|max:1024',

            'socials' => 'array|max:8',
            'socials.label' => 'string|max:255',
            'socials.link' => 'url|max:255',

            'skills' => 'array|max:16',
            'skills.*' => 'string|max:255',
        ];
    }
}
