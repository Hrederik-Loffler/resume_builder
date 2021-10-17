<?php

namespace App\Jobs\Resumes;

use App\Models\Resume;
use App\Services\ResumeService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class SaveResumeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(int $id, array $data)
    {
        $this->id = $id;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(ResumeService $resumeService)
    {
        // @TODO: Move this in Resume observer.
        Storage::disk("resume-previews")->delete(Resume::find($this->id)->editorpreview);

        $this->data['editorpreview'] = $resumeService->storePreview($this->data['editorpreview']);
        Resume::where('id', $this->id)->update($this->data);
    }
}
