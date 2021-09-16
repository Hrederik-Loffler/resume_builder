<?php

namespace App\Services;

use App\Models\Resume;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ResumeService
{
    /**
     * Accepts template content, and generates from this content Blade file that will
     * be used as a template to generate resumes.
     *
     * @param string $templateContent
     */
    public function storeTemplate(string $templateContent)
    {
        $filename = $this->generateName();
        $fullFilename = "$filename.blade.php";
        Storage::disk("templates")->put($fullFilename, $templateContent);
        return $filename;
    }

    /**
     * Generates name for new template.
     *
     * @return string
     */
    public function generateName()
    {
        $hash = Str::random();
        return "template-$hash";
    }
}
