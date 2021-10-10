<?php

namespace App\Services;

use App\Models\Resume;

class ResumeService extends DatabaseService
{
    /**
     * ResumeService contructor
     */
    public function __construct(Resume $resume, TagService $tagService)
    {
        $this->model = $resume;
        $this->tagService = $tagService;
    }

    /**
     * Update resume details.
     *
     * @param int $id
     * @param array $data
     */
    public function updateDetails(int $id, array $data)
    {
        // @NOTE: Update resume fields.
        $this->update($id, array_column($data, 'title', 'description'));

        // @NOTE: Update resume tags.
        $this->model->find($id)->tags()->sync($this->tagService->firstOrCreateMultiple($data['tags'] ?? []));
    }

    /**
     * Get resume details.
     *
     * @param int $id
     * @param array $data
     */
    public function getDetails(int $id)
    {
        return $this->findRelation($id)->select(['title', 'description', 'id'])->first()->toArray();
    }
}
