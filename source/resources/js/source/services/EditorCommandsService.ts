// @NOTE: Import from libraries.
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * EditorCommandsService - defines a list of commands for editor. These
 * are intended to be used by `EditorService`.
 */
export class EditorCommandsService {
    /**
     * Generates image from GrapesJS editor.
     */
    public async generateImage() {
        // @NOTE: Get DOM iframe element.
        const element = document.querySelector(
            ".gjs-frame"
        ) as HTMLIFrameElement;

        // @NOTE: Get document element from iframe.
        const doc = element.contentDocument as Document;

        // @NOTE: Render iframe document to the canvas and return the image.
        const canvas = await html2canvas(doc.body);
        const image = canvas.toDataURL("image/png");
        return { image, canvas };
    }

    /**
     * Save GrapesJS document as PDF.
     */
    public async savePDF() {
        console.log(this);

        const { image, canvas } = await this.generateImage();

        // @NOTE: Save image as PDF.
        const pdf = new jsPDF("p", "pt", "a4");
        pdf.addImage(
            image,
            "JPEG",
            0,
            0,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight()
        );
        pdf.save();
    }
}

export default new EditorCommandsService();
