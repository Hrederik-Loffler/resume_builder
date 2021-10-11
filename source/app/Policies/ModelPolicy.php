<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Resume;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

abstract class ModelPolicy
{
    use HandlesAuthorization;

    abstract protected function getModelClass(): string;

    /**
     * Must be in lowercase
     * @return string
     */
    abstract protected function getPolicyClass(): string;

    public function viewAny(User $user):bool
    {
        return $user->can($this->getModelClass() . $this->getPolicyClass() . '.view');
    }

    public function view(User $user, Resume $resume): bool
    {
        return $user->can($this->getModelClass() . $this->getPolicyClass() . '.view');
    }

    public function create(User $user): bool
    {
        return $user->can($this->getModelClass() . $this->getPolicyClass() . '.create');
    }

    public function update(User $user, Resume $resume): bool
    {
        return $user->can($this->getModelClass() . $this->getPolicyClass() . '.update');
    }

//    public function delete(User $user, Resume $resume):bool
//    {
//        return $user->can($this->getModelClass() . $this->getPolicyClass() . 'delete');
//    }

//    public function forceDelete(User $user, Resume $resume)
//    {
//        //
//    }

}
