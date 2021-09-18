<?php

namespace App\Exceptions\Http;

use App\Exceptions\Http\RequestException;

use Symfony\Component\HttpFoundation\Response;

class NotFoundException extends RequestException
{
    /**
     * NotFoundException constructor.
     */
    public function __construct(string $message = "Not found")
    {
        parent::__construct($message, Response::HTTP_NOT_FOUND);
    }
}
