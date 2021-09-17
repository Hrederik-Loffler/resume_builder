<?php

namespace App\Observers;

use App\Models\Resume;
use Illuminate\Support\Facades\Storage;

class ResumeObserver
{
    /**
     * Handle the Resume "deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function deleted(Resume $resume)
    {
        Storage::disk("templates")->delete("$resume->template_path.blade.php");
    }
}
