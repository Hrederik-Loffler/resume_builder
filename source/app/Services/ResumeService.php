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

    /**
     * Filter resumes by tags.
     *
     * @param array $tags
     */
    public function paginatedTags(array $tags = [])
    {
        $fields = ['resumes.id as id', 'title', 'description', 'image'];

        // @NOTE: If no tags were given, immediately return paginated results, because it's faster.
        if (count($tags) <= 0) {
            return $this->paginated($fields);
        }

        $query = $this->tagService->model->select($fields);
        $query = $query->whereIn('name', $tags);
        $query = $query->join('resume_tag', 'resume_tag.tag_id', '=', 'tags.id');
        $query = $query->join('resumes', 'resume_tag.resume_id', '=', 'resumes.id');
        return $query->simplePaginate(15)->toArray();
    }
}
