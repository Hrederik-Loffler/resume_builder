// @NOTE: Import from own files.
import { get, put } from "@actions/requests";
import {
    RESUMES_UPDATE_PROFILE_REQUEST,
    RESUMES_PROFILE_REQUEST,
} from "@constants/types/auth/profile";
import { IAction } from "@actions/action";
import User from "@js/types/User";

/**
 * IProfileData - data that's used to update user's profile.
 */
export interface IProfileData extends User {}

/**
 * updateProfile - returns objects that's used by axios middleware to
 * update user's profile.
 *
 * @param {object} body
 *
 * @returns {IAction}
 */
export function updateProfile(body: IProfileData): IAction {
    return put(`/profile`, RESUMES_UPDATE_PROFILE_REQUEST, body);
}

/**
 * getProfile - returns objects that's used by axios middleware to
 * get user's profile.
 *
 * @param {object} body
 *
 * @returns {IAction}
 */
export function getProfile(): IAction {
    return get(`/profile`, RESUMES_PROFILE_REQUEST);
}
