// @NOTE: Import from own files.
import { post } from "@actions/requests";
import { RESUMES_LOG_OUT_REQUEST } from "@constants/types/auth/log-out";
import { IAction } from "@interfaces/action";

/**
 * logOut - returns objects that's used by axios middleware to
 * log out the user from the website.
 *
 * @returns {IAction}
 */
export default function logOut(): IAction {
    return post(`/logout`, RESUMES_LOG_OUT_REQUEST);
}
