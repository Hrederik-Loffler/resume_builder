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
    onStore: (data: IResumeUpdate) => void;
}

/**
 * IEditorServiceInitOptions - options for `EditorService` `initEditor` method.
 */
interface IEditorServiceInitOptions {
    selector: string;
    urlLoad: string;
}

export type IResumeData = {
    assets: string;
    components: string;
    css: string;
    html: string;
    styles: string;
};

/**
 * IEditorExtendButtonsOptions - options for `EditorService` `extendButtonPanel` method.
 */
interface IEditorExtendButtonsOptions {
    onStore: (data: IResumeData) => void;
}

/**
 * EditorService - service that abstracts GrapesJS editor.
 */
export class EditorService {
    /**
     * Initialize EditorService state.
     *
     * @param {IEditorServiceOptions} params
     */
    public init(options: IEditorServiceOptions) {
        this.initEditor(options);
        this.extendButtonPanel(options);
    }

    /**
     * Initialize GrapesJS editor.
     *
     * @param {IEditorServiceOptions} params
     */
    private initEditor({ selector, urlLoad }: IEditorServiceInitOptions) {
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
    private extendButtonPanel(options: IEditorExtendButtonsOptions) {
        // @NOTE: Add save as PDF button.
        this.editor.Panels.addButton("options", [
            {
                id: "save",
                className: "fa fa-floppy-o icon-blank",
                command: () => EditorCommandsService.savePDF(),
                attributes: { title: "Save Template" },
            },
        ]);

        // @NOTE: Upload to server button.
        this.editor.Panels.addButton("options", [
            {
                id: "upload",
                className: "fa fa-upload",
                command: () => options.onStore(this.editor.storeData()),
                attributes: { title: "Upload Template" },
            },
        ]);
    }

    /**
     * Set canvas resolution.
     *
     * @param {string} id
     */
    public setCurrentDevice(id: string) {
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
    public attachEvent(name: string, handler: (data: object) => void) {
        this.editor.on(name, handler);
    }

    /**
     * Substitite a fields in the resume template with the given fields.
     *
     * @param {object} fields
     */
    public substitute(fields: object) {
        // @NOTE: Get DOM iframe element.
        const element = document.querySelector(
            ".gjs-frame"
        ) as HTMLIFrameElement;

        // @NOTE: Get document element from iframe.
        const doc = element.contentWindow.document as Document;

        for (const selector in fields) {
            // @NOTE: If educations, work experiences or other array fields.
            if (Array.isArray(fields[selector])) {
                // @NOTE: Don't remove block if there're no elements in fields.
                const block = doc.querySelector(`div.${selector} > div`);
                if (!fields[selector].length || !block) {
                    continue;
                }

                // @NOTE: Retrieve component from GrapesJS storage.
                const component =
                    this.editor.Components.componentsById[block.id];

                // @NOTE: Remove all nodes except first.
                doc.querySelectorAll(
                    `div.${selector} > div:nth-of-type(n + 2)`
                )?.forEach((el) =>
                    this.editor.Components.componentsById[el.id].remove()
                );

                // @NOTE: Copy base component and insert it _n_ times (e.g 3 times if user has 3 educations).
                const items = fields[selector];
                for (const item in items) {
                    // @NOTE: Clone component and append it. You can't directly use
                    // DOM to clone components, because it breaks GrapesJS state. If you
                    // clone DOM, then user won't be able to interact with this component.
                    const newComponent = component.clone();
                    component.parent().append(newComponent);

                    // @NOTE: After element was cloned, it would be inserted into DOM.
                    setTimeout(() => {
                        // @NOTE: For each field in array item (e.g educations), update field's content.
                        for (const field in items[item]) {
                            const fieldEl = doc.querySelector(
                                `div.${selector} > div:nth-of-type(${
                                    parseInt(item) + 1 // @NOTE: `item` is string.
                                }) .${field}`
                            );
                            if (fieldEl) fieldEl.innerText = items[item][field];
                        }
                    }, 0);
                }

                // @NOTE: Finally, remove node that was used as template.
                component.remove();
            } else {
                doc.querySelectorAll(`div.${selector}`)?.forEach((field) => {
                    field.innerText = fields[selector];
                });
            }
        }
    }
}

export default new EditorService();
