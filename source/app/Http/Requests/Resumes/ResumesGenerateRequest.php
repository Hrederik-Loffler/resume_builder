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
            'first_name' => 'string|max:255',
            'second_name' => 'string|max:255',
            'email' => 'email|max:255',
            'phone' => 'string',
            'job_title' => 'string|max:255',
            'summary' => 'string|max:1024'
        ];
    }
}
