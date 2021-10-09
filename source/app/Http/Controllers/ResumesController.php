<?php

namespace App\Http\Controllers;

use App\Http\Requests\Resumes\ResumesUpdateRequest;
use App\Http\Responses\AcceptedResponse;
use App\Http\Responses\RetrieveDataResponse;
use App\Jobs\Resumes\SaveResumeJob;
use App\Services\ResumeService;

class ResumesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(ResumeService $resumeService)
    {
        $this->resumeService = $resumeService;
    }

    /**
     * Retrieve an existing resume template.
     *
     * @param  \Illuminate\Http\ResumesUpdateRequest  $request
     * @return \Illuminate\Http\CreatedResponse
     */
    public function show(int $id)
    {
        return new RetrieveDataResponse($this->resumeService->find($id));
    }

    /**
     * Update an existing resume template.
     *
     * @param  \Illuminate\Http\ResumesUpdateRequest  $request
     * @return \Illuminate\Http\CreatedResponse
     */
    public function update(int $id, ResumesUpdateRequest $request)
    {
        dispatch(new SaveResumeJob($id, $request->validated()))->afterResponse();
        return new AcceptedResponse;
    }
}
