<?php

return [
    'resume' => [
        'first_name' => 'first_name',
        'second_name' => 'second_name',
        'location' => [
            'country' => 'country',
            'city' => 'city',
            'street' => 'street',
        ],
        'email' => 'test@email.com',
        'phone' => '+99999999999',
        'job_title' => 'job_title',
        'summary' => 'summary',
        'employment' => [
            [
                'title' => 'title',
                'employer' => 'employer',
                'since' => '2020-1-1',
                'until' => '2020-1-1',
                'city' => 'city',
                'description' => 'description'
            ]
        ],
        'education' => [
            [
                'school' => 'school',
                'degree' => 'degree',
                'since' => '2020-1-1',
                'until' => '2020-1-1',
                'city' => 'city',
                'description' => 'description'
            ]
        ],
        'socials' => [
            [
                'label' => 'label',
                'link' => 'https://link.com'
            ]
        ],
        'skills' => [
            'skill_1', 'skill_2', 'skill_3'
        ]
    ]
];
