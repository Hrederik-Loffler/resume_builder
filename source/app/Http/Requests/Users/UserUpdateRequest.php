<?php

namespace App\Http\Requests\User;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{

    use AuthorizesRequests{
        authorize as can;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     * @throws AuthorizationException
     */
    public function authorize():bool
    {
        return $this->can('update', $this->route('user'))->allowed();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules():array
    {
        return [
            'email' => ['required', 'email', Rule::unique('users')->ignore(auth()->id())],
            'name' => 'required|max:255',
            'roles' => 'array',
            'scopes' => 'array',
        ];
    }
}
