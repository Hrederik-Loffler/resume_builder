<?php

namespace App\Services;

use App\Exceptions\Http\InvalidDataException;
use App\Exceptions\Http\NotFoundException;
use App\Models\Resume;
use Barryvdh\DomPDF\PDF;
use Facade\Ignition\Exceptions\ViewException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;

class ResumeService extends DatabaseService
{
    /**
     * ResumeService contructor
     */
    public function __construct(Resume $model, PDF $pdf)
    {
        $this->model = $model;
        $this->pdf = $pdf;
    }

    /**
     * Accepts template content, and generates from this content Blade file that will
     * be used as a template to generate resumes.
     *
     * @param string $templateContent
     */
    public function storeTemplate(string $templateContent)
    {
        $filename = $this->generateName();
        $fullFilename = $this->templateFullname($filename);
        Storage::disk("templates")->put($fullFilename, $templateContent);
        return $filename;
    }

    /**
     * Deletes template by the given $templatePath.
     *
     * @param string $templatePath
     */
    public function deleteTemplate(string $templatePath)
    {
        Storage::disk("templates")->delete($this->templateFullname($templatePath));
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

    /**
     * @param array $data
     */
    public function create(array $data)
    {
        $data['template_path'] = $this->storeTemplate($data['template']);
        parent::create($data);
    }

    /**
     * Adds `blade.php` extension to $templateName.
     *
     * @param string $templateName
     *
     * @return string
     */
    public function templateFullname(string $templateName)
    {
        return "$templateName.blade.php";
    }

    /**
     * Generate resume from the given template and data.
     *
     * @param array $data
     *
     * @return \Illuminate\Http\Response
     */
    public function generate(string $templatePath, array $data)
    {
        try {
            $this->pdf->loadView($templatePath, $data);
            return $this->pdf->stream();
        } catch (InvalidArgumentException $e) {
            throw new NotFoundException("Resume template wasn't found");
        } catch (ViewException $e) {
            // @NOTE: ViewException indicates that arguments that were passed are incorrect. It could be
            // invalid types (expected string, got array) or missing fields.
            throw new InvalidDataException("You have passed invalid data. Make sure you've filled all necessary fields correctly.");
        }
    }
}
