<?php

namespace App\Services;

use App\Models\Degree;

class DegreeService extends DatabaseService
{
    /**
     * DegreeService contructor
     */
    public function __construct(Degree $degree)
    {
        $this->model = $degree;
    }
}
