<?php

namespace App\Http\Requests\Resumes;

use Illuminate\Foundation\Http\FormRequest;

class ResumesUpdateRequest extends FormRequest
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
            'editorassets' => 'string',
            'editorcomponents' => 'string',
            'editorcss' => 'string',
            'editorhtml' => 'string|nullable', // @NOTE: Editor may send an empty template.
            'editorstyles' => 'string',
        ];
    }
}
