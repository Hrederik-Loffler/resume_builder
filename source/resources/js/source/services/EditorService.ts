// @NOTE: grapesjs doesn't support Typescript declarations.
// @ts-nocheck

// @NOTE: Import from libraries.
import grapesjs from "grapesjs";
import gjsPresetWebpack from "grapesjs-preset-webpage";

// @NOTE: Import from own files.
import EditorCommandsService from "@services/EditorCommandsService";

/**
 * IEditorServiceOptions - options for `EditorService`.
 */
export interface IEditorServiceOptions {
    selector: string;
    urlLoad: string;
    urlStore: string;
}

/**
 * IEditorServiceInitOptions - options for `EditorService` `initEditor` method.
 */
interface IEditorServiceInitOptions {
    selector: string;
    urlLoad: string;
    urlStore: string;
}

export type UserInputField = {
    selector: string;
    value: ?string;
};

/**
 * EditorService - service that abstracts GrapesJS editor.
 */
export default class EditorService {
    /**
     * Initialize EditorService state.
     *
     * @param {IEditorServiceOptions} params
     */
    public static init(options: IEditorServiceOptions) {
        this.initEditor(options);
        this.extendButtonPanel();
    }

    /**
     * Initialize GrapesJS editor.
     *
     * @param {IEditorServiceOptions} params
     */
    private static initEditor({
        selector,
        urlLoad,
        urlStore,
    }: IEditorServiceInitOptions) {
        this.editor = grapesjs.init({
            container: selector,
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

                urlLoad: urlLoad,
                urlStore: urlStore,
                autosave: false,
                headers: {
                    "Content-Type": "application/json",
                },
            },
            fromElement: true,
            plugins: [gjsPresetWebpack],
        });
    }

    /**
     * Add more buttons to button panel.
     */
    private static extendButtonPanel() {
        // @NOTE: Add save as PDF button.
        this.editor.Panels.addButton("options", [
            {
                id: "save",
                className: "fa fa-floppy-o icon-blank",
                command: EditorCommandsService.savePDF,
                attributes: { title: "Save Template" },
            },
        ]);

        // @NOTE: Upload to server button.
        this.editor.Panels.addButton("options", [
            {
                id: "upload",
                className: "fa fa-upload",
                command: async () => {
                    await this.editor.store();
                },
                attributes: { title: "Upload Template" },
            },
        ]);
    }

    /**
     * Set canvas resolution.
     *
     * @param {string} id
     */
    public static setCurrentDevice(id: string) {
        this.editor.Devices.select(id);
    }

    /**
     * @callback editorEventHandler
     */

    /**
     * Attach an GrapesJS event handler.
     *
     * @param {string} name
     * @param {editorEventHandler} handler
     */
    public static attachEvent(name: string, handler: () => void) {
        this.editor.on(name, handler);
    }

    /**
     * Substitite a fields in the resume template with the given fields.
     *
     * @param {UserInputField[]} fields
     */
    public static substitute(fields: UserInputField[]) {
        fields.forEach((field) => {});
    }
}
