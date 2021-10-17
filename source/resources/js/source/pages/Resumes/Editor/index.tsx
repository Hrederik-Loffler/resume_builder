// @NOTE: Import library functions.
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// @NOTE: Import custom functions.
import ScreenLoading from "@components/layouts/Loading/ScreenLoading";
import EditorService, { IResumeData } from "@services/EditorService";
import { useDispatch } from "react-redux";

// @NOTE: Import misc.
import routes from "@constants/routes";
import ToastService from "@services/ToastService";
import { updateResume } from "@actions/resumes/single";
import EditorCommandsService from "@services/EditorCommandsService";

/**
 * IPageParams - path parameters used in editor page.
 */
export interface IPageParams {
    id: string;
}

/**
 * Editor - page where admin can create new resume.
 *
 * @return {JSX.Element}
 */
export default function ResumesEditor() {
    // @NOTE: State hooks.
    const [loading, setLoading] = useState(true);

    // @NOTE: Router hooks.
    let { id } = useParams<IPageParams>();
    const dispatch = useDispatch();
    let history = useHistory();

    // @NOTE: Editor store callback.
    const storeResume = async (data: IResumeData) => {
        const { image } = await EditorCommandsService.generateImage();

        var img = new Image();
        img.src = image;
        document.body.appendChild(img);

        await dispatch(
            updateResume(id, {
                editorassets: data.assets,
                editorcomponents: data.components,
                editorcss: data.css,
                editorhtml: data.html,
                editorstyles: data.styles,
                editorpreview: image,
            })
        );
    };

    // @NOTE: On component mounted.
    useEffect(() => {
        EditorService.init({
            selector: "#editor",
            urlLoad: `/api/resumes/${id}`,
            onStore: storeResume,
        });

        // @NOTE: Attach event listeners.
        EditorService.attachEvent("load", () => setLoading(false));

        // @NOTE: If template wasn't found, throw an error.
        EditorService.attachEvent("storage:error:load", () => {
            history.push(routes.home.url);
            ToastService.error("Template wasn't found");
        });
    }, []);

    return (
        <ScreenLoading loading={loading}>
            <div id="editor"></div>
        </ScreenLoading>
    );
}
