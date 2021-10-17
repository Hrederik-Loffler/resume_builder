<?php

namespace App\Http\Requests\Users;

use App\Rules\PhoneRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
            'first_name' => 'string|max:31|required',
            'second_name' => 'string|max:31|required',
            'email' => 'string|max:255|email|required',
            'phone' => new PhoneRule,
            'country' => 'string|max:63|nullable',
            'city' => 'string|max:255|nullable',

            'educations' => 'array|max:4',
            'educations.*.school' => 'string|max:255|required',
            'educations.*.degree' => 'string|max:255|required',
            'educations.*.since' => 'date|required',
            'educations.*.until' => 'date|required',

            'workExperiences' => 'array|max:4',
            'workExperiences.*.title' => 'string|max:255|required',
            'workExperiences.*.responsibilities' => 'string|max:1023|required',
            'workExperiences.*.since' => 'date|required',
            'workExperiences.*.until' => 'date|required',

            'accomplishments' => 'string|max:1023|nullable',
        ];
    }
}
