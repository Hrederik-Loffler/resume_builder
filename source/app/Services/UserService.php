<?php

namespace App\Services;

use App\Models\User;

class UserService extends DatabaseService
{
    /**
     * UserService contructor
     */
    public function __construct(User $user, EducationService $educationService)
    {
        $this->model = $user;
        $this->educationService = $educationService;
    }

    /**
     * Update user's profile.
     *
     * @param int $id
     * @param array $data
     */
    public function updateProfile(int $id, array $data)
    {
        // @NOTE: Update profile fields.
        $this->update($id, $data);

        // @NOTE: Update profile educations.
        $user = $this->model->find($id);
        $user->educations()->delete();
        $user->educations()->saveMany($this->educationService->firstOrCreateMultipleEducations($id, $data['educations'] ?? []));
    }
}
