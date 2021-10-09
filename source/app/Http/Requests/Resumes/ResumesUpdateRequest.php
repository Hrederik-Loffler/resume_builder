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
            'editorassets' => 'string|max:98304',
            'editorcomponents' => 'string|max:65536',
            'editorcss' => 'string|max:4096',
            'editorhtml' => 'string|nullable|max:98304', // @NOTE: Editor may send an empty template.
            'editorstyles' => 'string|max:4096',
        ];
    }
}
