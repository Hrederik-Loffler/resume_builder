<?php

namespace App\Http\Controllers;

use App\Http\Requests\Resumes\ResumesGenerateRequest;
use App\Http\Requests\Resumes\ResumesStoreRequest;
use App\Http\Responses\CreatedResponse;
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\ResumesStoreRequest  $request
     * @return \Illuminate\Http\CreatedResponse
     */
    public function store(ResumesStoreRequest $request)
    {
        $this->resumeService->create($request->validated());
        return new CreatedResponse();
    }

    /**
     * Generate resume from the given template id and data.
     *
     * @param  \Illuminate\Http\ResumesGenerateRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function generate(ResumesGenerateRequest $request)
    {
        $resume = $this->resumeService->find($request->id);
        return $this->resumeService->generate($resume->template_path, $request->validated());
    }
}
