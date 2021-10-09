<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Symfony\Component\HttpFoundation\Response;

/**
 * RetrieveDataResponse returns only the necessary data, without message. It's used
 * to retrieve data for editor.
 */
class RetrieveDataResponse implements Responsable
{
    /**
     * @param string $message
     * @param int $code
     */
    public function __construct(array $data = [])
    {
        $this->data = $data;
        $this->code = Response::HTTP_ACCEPTED;
    }

    /**
     * @return int
     */
    public function status()
    {
        return $this->code;
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        return response($this->data, $this->code);
    }
}
