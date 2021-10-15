// @NOTE: Import from own files.
import { get, put } from "@actions/requests";
import {
    RESUME_SINGLE_REQUEST,
    RESUME_UPDATE_REQUEST,
} from "@constants/types/resumes/single";
import IAction from "@interfaces/IAction";
import Tag from "@js/types/Tag";

/**
 * loadResume - returns objects that's used by axios middleware to
 * retrieve paginated list of resumes.
 *
 * @param {string} - query string that was received from useLocation().search
 *
 * @returns {IAction}
 */
export function loadResume(id: string | number): IAction {
    return get(`/resumes/${id}/details`, RESUME_SINGLE_REQUEST);
}

/**
 * IUpdateResumeProps - data that's used to update resume.
 */
export interface IUpdateResumeProps {
    title: string;
    description: string;
    tag: string;
    tags: Tag[];
}

/**
 * updateResume - returns objects that's used by axios middleware to
 * update resume.
 *
 * @param {string} - query string that was received from useLocation().search
 *
 * @returns {IAction}
 */
export function updateResume(
    id: string | number,
    data: IUpdateResumeProps
): IAction {
    return put(`/resumes/${id}/details`, RESUME_UPDATE_REQUEST, data);
}
