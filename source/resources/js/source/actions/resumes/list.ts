// @NOTE: Import from own files.
import { get } from "@actions/requests";
import { RESUMES_LIST_REQUEST } from "@constants/types/resumes/list";
import { IAction } from "@actions/action";

/**
 * loadResumes - returns objects that's used by axios middleware to
 * retrieve paginated list of resumes.
 *
 * @param {object} params
 *
 * @returns {IAction}
 */
export default function loadResumes(params: object): IAction {
    return get(`/resumes`, RESUMES_LIST_REQUEST, params);
}
