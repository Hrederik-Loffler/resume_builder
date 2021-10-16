<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Symfony\Component\HttpFoundation\Response;

class CreatedResponse implements Responsable
{
    /**
     * @param string $message
     * @param int $code
     */
    public function __construct($data = [], string $message = "Successfully created")
    {
        $this->message = $message;
        $this->data = $data;
        $this->code = Response::HTTP_CREATED;
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
        return response(['message' => $this->message, 'data' => $this->data], $this->code);
    }
}
