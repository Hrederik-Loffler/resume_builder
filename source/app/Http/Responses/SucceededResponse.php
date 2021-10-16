<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Symfony\Component\HttpFoundation\Response;

class SucceededResponse implements Responsable
{
    /**
     * @param string $message
     * @param int $code
     */
    public function __construct($data = [], string $message = "Successful")
    {
        $this->message = $message;
        $this->data = $data;
        $this->code = Response::HTTP_OK;
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
