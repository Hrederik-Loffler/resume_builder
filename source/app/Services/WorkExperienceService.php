<?php

namespace App\Services;

use App\Models\WorkExperience;

class WorkExperienceService extends DatabaseService
{
    /**
     * EducationService contructor
     */
    public function __construct(WorkExperience $workExperience, JobService $jobService)
    {
        $this->model = $workExperience;
        $this->jobService = $jobService;
    }

    /**
     * First or create multiple entries for the work experience.
     *
     * @param array $data
     */
    public function firstOrCreateMultipleEducations(int $user_id, array $data)
    {
        return array_map(function ($workExperience) use ($user_id) {
            $workExperienceData = [
                'user_id' => $user_id,
                'job_id' => $this->jobService->firstOrCreate(['name' => $workExperience['title']])->id,
                'since' => $workExperience['since'],
                'until' => $workExperience['until'],
                'responsibilities' => $workExperience['responsibilities']
            ];
            return $this->model->firstOrCreate($workExperienceData);
        }, $data);
    }
}
