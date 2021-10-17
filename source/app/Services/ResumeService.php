<?php

namespace App\Services;

use App\Exceptions\Http\NotFoundException;
use App\Models\Resume;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        $this->update($id, $data);

        // @NOTE: Update resume tags.
        $this->model->find($id)->tags()->sync($this->tagService->firstOrCreateMultiple($data['tags'] ?? []));
    }

    /**
     * Create a resume.
     *
     * @param int $id
     * @param array $data
     */
    public function create(array $data)
    {
        // @NOTE: Store resume in `resumes` table.
        $resume = parent::create($data);

        // @NOTE: Create tags in `tags` table.
        $this->model->find($resume->id)->tags()->sync($this->tagService->firstOrCreateMultiple($data['tags'] ?? []));

        return $resume;
    }

    /**
     * Get resume details.
     *
     * @param int $id
     * @param array $data
     */
    public function getDetails(int $id)
    {
        $entry = $this->model->select(['title', 'description', 'id'])->find($id);
        if ($entry == null) {
            throw new NotFoundException();
        }
        return $entry->toArray();
    }

    /**
     * Filter resumes by tags.
     *
     * @param array $tags
     */
    public function paginatedTags(array $tags = [])
    {
        $fields = ['resumes.id as id', 'title', 'description', 'editorpreview'];

        // @NOTE: If no tags were given, immediately return paginated results, because it's faster.
        if (count($tags) <= 0) {
            return $this->paginated($fields)->toArray();
        }

        $query = $this->tagService->model->select($fields);
        $query = $query->whereIn('name', $tags);
        $query = $query->join('resume_tag', 'resume_tag.tag_id', '=', 'tags.id');
        $query = $query->join('resumes', 'resume_tag.resume_id', '=', 'resumes.id');
        return $query->simplePaginate(15)->toArray();
    }

    /**
     * Store image preview as file.
     *
     * @param array $tags
     */
    public function storePreview(string $base64Data)
    {
        $image = str_replace('data:image/png;base64,', '', $base64Data);
        $image = str_replace(' ', '+', $image);
        $imageName = Str::random(64) . '.' . 'png';
        Storage::disk('resume-previews')->put($imageName, base64_decode($image));
        return $imageName;
    }
}
