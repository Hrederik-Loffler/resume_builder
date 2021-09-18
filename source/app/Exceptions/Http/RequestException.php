<?php

namespace App\Exceptions\Http;

use App\Http\Responses\ExceptionResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class RequestException extends HttpException
{
    /**
     * RequestException constructor.
     * @param string $message
     * @param int $code
     * @param array $errors
     */
    public function __construct(string $message, int $code = Response::HTTP_INTERNAL_SERVER_ERROR, array $errors = [])
    {
        $this->message = $message;
        $this->code = $code;
        $this->errors = $errors;
        parent::__construct($code, $message);
    }

    /**
     * Render exception
     *
     * @return \App\Http\Responses\ExceptionResponse
     */
    public function render()
    {
        return new ExceptionResponse($this->message, $this->code, $this->errors);
    }
}
