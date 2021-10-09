<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateResumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->dropColumn("template_path");
            $table->text("editorassets")->nullable();
            $table->text("editorcomponents")->nullable();
            $table->text("editorcss")->nullable();
            $table->text("editorhtml")->nullable();
            $table->text("editorstyles")->nullable();
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
            $table->string("template_path");
            $table->dropColumn("editorassets");
            $table->dropColumn("editorcomponents");
            $table->dropColumn("editorcss");
            $table->dropColumn("editorhtml");
            $table->dropColumn("editorstyles");
        });
    }
}
