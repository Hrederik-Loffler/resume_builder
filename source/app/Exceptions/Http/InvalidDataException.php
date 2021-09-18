<?php

namespace App\Exceptions\Http;

use App\Exceptions\Http\RequestException;

use Symfony\Component\HttpFoundation\Response;

class InvalidDataException extends RequestException
{
    /**
     * InvalidDataException constructor.
     */
    public function __construct(string $message = "Invalid data")
    {
        parent::__construct($message, Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
