import { RESUMES_LIST_REQUEST } from "@constants/types/resumes/list";
import IAction from "@interfaces/IAction";

/**
 * loadResumes - returns objects that's used by axios middleware to
 * retrieve paginated list of resumes.
 *
 * @param {string} - query string that was received from useLocation().search
 *
 * @returns {IAction}
 */
export default function loadResumes(params: string = ""): IAction {
    return {
        type: RESUMES_LIST_REQUEST,
        payload: {
            request: {
                url: `/resumes${params}`,
            },
        },
    };
}
