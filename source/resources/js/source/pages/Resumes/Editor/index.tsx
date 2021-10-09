// @NOTE: grapesjs doesn't support Typescript declarations.
// @ts-nocheck

// @NOTE: Import library functions.
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import grapesjs from "grapesjs";
import gjsPresetWebpack from "grapesjs-preset-webpage";

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

/**
 * Editor - page where admin can create new resume.
 *
 * @return {JSX.Element}
 */
export default function ResumesEditor() {
    const [editor, setEditor] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            deviceManager: {
                devices: [
                    {
                        id: "A4",
                        name: "A4",
                        width: "21cm",
                        height: "29.7cm",
                    },
                ],
            },
            storageManager: {
                type: "remote",

                contentTypeJson: true,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
                id: "editor",

                urlLoad: `/api/resumes/${id}`,
                urlStore: `/api/resumes/${id}`,
                autosave: false,
                headers: {
                    "Content-Type": "application/json",
                },
            },
            fromElement: true,
            plugins: [gjsPresetWebpack],
        });

        // @NOTE: Hide devices dropdown.
        editor.getConfig().showDevices = false;

        // @NOTE: Set fixed canvas sizes.
        const deviceManager = editor.Devices;
        deviceManager.select("A4");

        // @NOTE: Add save as PDF button.
        editor.Panels.addButton("options", [
            {
                id: "save",
                className: "fa fa-floppy-o icon-blank",
                command: async () => {
                    const canvas = await html2canvas(
                        document.querySelector(".gjs-frame").contentDocument
                            .body
                    );
                    const image = canvas.toDataURL("image/png");

                    const pdf = new jsPDF("p", "pt", "a4");
                    pdf.addImage(
                        image,
                        "JPEG",
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                    pdf.save();
                },
                attributes: { title: "Save Template" },
            },
        ]);

        // @NOTE: Upload to server button.
        editor.Panels.addButton("options", [
            {
                id: "save",
                className: "fa fa-upload",
                command: async () => {
                    await editor.store();
                },
                attributes: { title: "Upload Template" },
            },
        ]);

        setEditor(editor);
    }, []);

    return <div id="editor"></div>;
}
