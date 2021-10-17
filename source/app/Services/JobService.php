<?php

namespace App\Services;

use App\Models\Job;

class JobService extends DatabaseService
{
    /**
     * JobService contructor
     */
    public function __construct(Job $job)
    {
        $this->model = $job;
    }
}
