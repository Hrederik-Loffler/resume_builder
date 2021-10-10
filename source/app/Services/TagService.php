<?php

namespace App\Services;

use App\Models\Tag;

class TagService extends DatabaseService
{
    /**
     * TagService contructor
     */
    public function __construct(Tag $tag)
    {
        $this->model = $tag;
    }
}
