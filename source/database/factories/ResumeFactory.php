<?php

namespace Database\Factories;

use App\Models\Resume;
use App\Services\ResumeService;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResumeFactory extends Factory
{
    /**
     * @param ResumeService $resumeService
     */
    function __construct()
    {
        // @NOTE: Factories can't use dependency injections.
        $this->resumeService = app()->make(ResumeService::class);

        parent::__construct();
    }

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Resume::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->title(),
            'description' => $this->faker->realText(),
            'image' => $this->faker->image(),
            'template_path' => $this->resumeService->storeTemplate($this->faker->randomHtml())
        ];
    }
}
