<?php

namespace App\Policies;

use App\Models\Resume;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ResumeEditorPolicy extends ModelPolicy
{
    use HandlesAuthorization;

    protected function getModelClass(): string
    {
        return Resume::class;
    }

    protected function getPolicyClass(): string
    {
        return 'editor';
    }

    public function upload(User $user):bool
    {
        return $user->can($this->getModelClass() . $this->getPolicyClass() . '.upload');
    }
}
