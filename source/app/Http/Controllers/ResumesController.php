<?php

namespace App\Http\Controllers;

use App\Http\Requests\Resumes\ResumesUpdateDetailsRequest;
use App\Http\Requests\Resumes\ResumesUpdateRequest;
use App\Http\Responses\AcceptedResponse;
use App\Http\Responses\RetrieveDataResponse;
use App\Http\Responses\SucceededResponse;
use App\Jobs\Resumes\SaveResumeJob;
use App\Services\ResumeService;
use Illuminate\Http\Request;

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
     * Retrieve a list of resume templates.
     *
     * @param  \Illuminate\Http\ResumesUpdateRequest  $request
     * @return \Illuminate\Http\CreatedResponse
     */
    public function index(Request $request)
    {
        return new SucceededResponse($this->resumeService->paginatedTags($request->query('tags', [])), "Successfully retrieved the list of resumes");
    }

    /**
     * Retrieve an existing resume template.
     *
     * @param  \Illuminate\Http\ResumesUpdateRequest  $request
     * @return \Illuminate\Http\CreatedResponse
     */
    public function show(int $id)
    {
        return new RetrieveDataResponse($this->resumeService->find($id)->toArray());
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
        return new AcceptedResponse("Successfully the resume for processing");
    }

    /**
     * Update an existing resume template details.
     *
     * @param  \Illuminate\Http\ResumesUpdateRequest  $request
     * @return \Illuminate\Http\CreatedResponse
     */
    public function updateDetails(int $id, ResumesUpdateDetailsRequest $request)
    {
        $this->resumeService->updateDetails($id, $request->validated());
        return new SucceededResponse([], "Successfully updated the resume");
    }

    /**
     * Get an existing resume template details.
     *
     * @param  \Illuminate\Http\ResumesUpdateRequest  $request
     * @return \Illuminate\Http\CreatedResponse
     */
    public function getDetails(int $id)
    {
        return new SucceededResponse($this->resumeService->getDetails($id), "Successfully retrieved details about the resume");
    }
}
