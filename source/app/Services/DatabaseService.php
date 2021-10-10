<?php

namespace App\Services;

use App\Exceptions\Http\NotFoundException;

abstract class DatabaseService
{
    /**
     * Get all entries from the model.
     *
     * @return array
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Get paginated list of entries.
     *
     * @return array
     */
    public function paginated(array $fields)
    {
        return $this->model->select($fields)->simplePaginate(15)->toArray();
    }

    /**
     * Create new entry for the model.
     *
     * @param array $data
     */
    public function create(array $data)
    {
        $this->model->create($data);
    }

    /**
     * First or create multiple tnries for the model.
     *
     * @param array $data
     */
    public function firstOrCreateMultiple(array $data)
    {
        return array_map(function ($entry) {
            return $this->model->firstOrCreate($entry)->id;
        }, $data);
    }

    /**
     * Find entry by id without converting to array.
     *
     * @param int $id
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function findRelation(int $id)
    {
        $entry = $this->model->find($id);
        if ($entry == null) {
            throw new NotFoundException();
        }
        return $entry;
    }

    /**
     * Find entry by id.
     *
     * @param int $id
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function find(int $id)
    {
        return $this->findRelation($id)->toArray();
    }

    /**
     * Update entry.
     *
     * @param int $id
     * @param array $data
     */
    public function update(int $id, array $data)
    {
        $entry = $this->model->find($id);
        if ($entry == null) {
            throw new NotFoundException();
        }
        $entry->update($data);
    }
}
