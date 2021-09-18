<?php

namespace App\Http\Requests\Resumes;

use Illuminate\Foundation\Http\FormRequest;

class ResumesStoreRequest extends FormRequest
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
            "template" => "required|string|max:16384",
            "title" => "required|string|max:255",
            "description" => "required|string|max:255"
        ];
    }
}
