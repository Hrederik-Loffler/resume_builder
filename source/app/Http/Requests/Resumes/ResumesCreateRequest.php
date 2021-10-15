<?php

namespace App\Http\Requests\Resumes;

use Illuminate\Foundation\Http\FormRequest;

class ResumesCreateRequest extends FormRequest
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
            'title' => 'string|max:64|required',
            'description' => 'string|max:256|required',
            'tags' => 'array|max:8|min:1',
            'tags.*.name' => 'string|max:32|required',
        ];
    }
}
