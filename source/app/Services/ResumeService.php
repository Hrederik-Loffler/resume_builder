<?php

namespace App\Services;

use App\Models\Resume;

class ResumeService extends DatabaseService
{
    /**
     * ResumeService contructor
     */
    public function __construct(Resume $resume)
    {
        $this->model = $resume;
    }
}
