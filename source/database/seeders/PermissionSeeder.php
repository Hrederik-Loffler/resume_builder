<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
//            'create.view', //for all
//            'create.store', // for all
//            'create.edit', //for all

            'resumes.details.view', //for all
            'resumes.details.update', //admin
            'resumes.details.create', //admin

            'resumes.editor.view', //for all
            'resumes.editor.create', //for all
            'resumes.editor.upload', //only for admin
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission
            ]);
        }

        $role = Role::firstOrCreate(['name' => 'Super Admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::firstOrCreate(['name' => 'Customer']);
        $role->givePermissionTo(
//            'create.view',
//            'create.store',
//            'create.edit',
            'resumes.details.view',
            'resumes.editor.view',
            'resumes.editor.create',
        );

        $role = Role::firstOrCreate(['name' => 'Template Designer']);
        $role->givePermissionTo(
//            'create.view',
//            'create.store',
//            'create.edit',

            'resumes.details.view',
            'resumes.details.update',
            'resumes.details.create',

            'resumes.editor.view',
            'resumes.editor.create',
            'resumes.editor.upload'
        );
    }
}
