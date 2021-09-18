<?php

namespace App\Http\Requests\Resumes;

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
            'first_name' => 'string|required|max:255',
            'second_name' => 'string|required|max:255',
        ];
    }
}
