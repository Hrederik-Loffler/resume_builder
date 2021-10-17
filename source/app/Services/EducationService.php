<?php

namespace App\Services;

use App\Models\Education;

class EducationService extends DatabaseService
{
    /**
     * EducationService contructor
     */
    public function __construct(Education $education, SchoolService $schoolService, DegreeService $degreeService)
    {
        $this->model = $education;
        $this->schoolService = $schoolService;
        $this->degreeService = $degreeService;
    }

    /**
     * First or create multiple entries for the education.
     *
     * @param array $data
     */
    public function firstOrCreateMultipleEducations(int $user_id, array $data)
    {
        return array_map(function ($education) use ($user_id) {
            $educationData = [
                'user_id' => $user_id,
                'school_id' => $this->schoolService->firstOrCreate(['name' => $education['school']])->id,
                'degree_id' => $this->degreeService->firstOrCreate(['name' => $education['degree']])->id,
                'since' => $education['since'],
                'until' => $education['until'],
            ];
            return $this->model->firstOrCreate($educationData);
        }, $data);
    }
}
