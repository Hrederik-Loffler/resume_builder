// @NOTE: Import from own files.
import { get, post, put } from "@actions/requests";
import {
    RESUME_CREATE_REQUEST,
    RESUME_SINGLE_REQUEST,
    RESUME_UPDATE_REQUEST,
} from "@constants/types/resumes/single";
import { IAction } from "@actions/action";
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
 * IResumeDetailsData - data that's used to update resume.
 */
export interface IResumeDetailsData {
    title: string;
    description: string;
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
    data: IResumeDetailsData
): IAction {
    return put(`/resumes/${id}/details`, RESUME_UPDATE_REQUEST, data);
}

export interface ICreateResumeActionData {
    id: number;
}

/**
 * updateResume - returns objects that's used by axios middleware to
 * update resume.
 *
 * @param {string} - query string that was received from useLocation().search
 *
 * @returns {IAction}
 */
export function createResume(
    data: IResumeDetailsData
): IAction<ICreateResumeActionData> {
    return post(`/resumes`, RESUME_CREATE_REQUEST, data);
}
