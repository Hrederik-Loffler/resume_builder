// @NOTE: Import library functions.
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// @NOTE: Import custom functions.
import ScreenLoading from "@components/layouts/Loading/ScreenLoading";
import EditorService from "@services/EditorService";

// @NOTE: Import misc.
import routes from "@constants/routes";

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
    let history = useHistory();

    // @NOTE: On component mounted.
    useEffect(() => {
        EditorService.init({
            selector: "#editor",
            urlLoad: `/api/resumes/${id}`,
            urlStore: `/api/resumes/${id}`,
        });

        // @NOTE: Attach event listeners.
        EditorService.attachEvent("load", () => setLoading(false));

        // @NOTE: If template wasn't found, throw an error.
        EditorService.attachEvent("storage:error:load", () =>
            history.push(routes.home.url)
        );
    }, []);

    return (
        <ScreenLoading loading={loading}>
            <div id="editor"></div>
        </ScreenLoading>
    );
}
