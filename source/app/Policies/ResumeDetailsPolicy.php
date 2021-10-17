<?php

namespace App\Policies;

use App\Models\Resume;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ResumeDetailsPolicy extends ModelPolicy
{
    use HandlesAuthorization;

    protected function getModelClass(): string
    {
        return Resume::class;
    }

    protected function getPolicyClass(): string
    {
        return 'details';
    }

}
