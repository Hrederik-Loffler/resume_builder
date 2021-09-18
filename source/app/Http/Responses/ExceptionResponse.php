<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Symfony\Component\HttpFoundation\Response;

class ExceptionResponse implements Responsable
{
    /**
     * @param string $message
     * @param int $code
     */
    public function __construct(string $message, int $code, array $errors)
    {
        $this->message = $message;
        $this->code = $code;
        $this->errors = $errors;
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
        return response(['message' => $this->message, "errors" => $this->errors], $this->code);
    }
}
