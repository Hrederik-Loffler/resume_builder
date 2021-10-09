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
     * Create new entry for the model.
     *
     * @param array $data
     */
    public function create(array $data)
    {
        $this->model->create($data);
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
        $data = $this->model->find($id);
        if ($data == null) {
            throw new NotFoundException();
        }
        return $data->toArray();
    }
}
