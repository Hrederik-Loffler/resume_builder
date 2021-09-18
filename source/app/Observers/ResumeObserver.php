<?php

namespace App\Observers;

use App\Exceptions\Http\InvalidDataException;
use App\Exceptions\Http\NotFoundException;
use App\Models\Resume;
use App\Services\ResumeService;
use Illuminate\Support\Facades\Storage;

class ResumeObserver
{
    /**
     * @param ResumeService $resumeService
     */
    public function __construct(ResumeService $resumeService)
    {
        $this->resumeService = $resumeService;
    }

    /**
     * Handle the Resume "deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function deleted(Resume $resume)
    {
        $this->resumeService->deleteTemplate($resume->template_path);
    }

    /**
     * Handle the Resume "creating" event. It tests template before inserting it.
     *
     * @param Resume $resume
     */
    public function creating(Resume $resume)
    {
        try {
            // @NOTE: Validate template with test data before finally saving it.
            $this->resumeService->generate($resume->template_path, config('constants.resume'));
        } catch (InvalidDataException | NotFoundException $e) {
            // @NOTE: Don't forget to delete template in templates folder, because it's invalid.
            $this->resumeService->deleteTemplate($resume->template_path);
            throw new InvalidDataException("Your template doesn't follow our rules. Please, refer to documentation.");
        }
    }
}
