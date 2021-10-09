<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeEditorColumnsInResumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->mediumText("editorassets")->nullable()->change();
            $table->mediumText("editorcomponents")->nullable()->change();
            $table->mediumText("editorhtml")->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->text("editorassets")->nullable()->change();
            $table->text("editorcomponents")->nullable()->change();
            $table->text("editorhtml")->nullable()->change();
        });
    }
}
