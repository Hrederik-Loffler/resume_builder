<?php

namespace App\Services;

use App\Models\School;

class SchoolService extends DatabaseService
{
    /**
     * SchoolService contructor
     */
    public function __construct(School $school)
    {
        $this->model = $school;
    }
}
