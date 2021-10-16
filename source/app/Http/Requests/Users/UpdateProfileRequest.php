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
            'country' => 'string|max:63|required',
            'city' => 'string|max:255|required',

            'educations' => 'array|max:4',
            'educations.*.school' => 'string|max:255|required',
            'educations.*.degree' => 'string|max:255|required',
            'educations.*.since' => 'date|required',
            'educations.*.until' => 'date|required',
        ];
    }
}
