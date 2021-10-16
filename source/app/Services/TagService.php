<?php

namespace App\Services;

use App\Models\Education;

class TagService extends DatabaseService
{
    /**
     * TagService contructor
     */
    public function __construct(Education $education)
    {
        $this->model = $education;
    }
}
