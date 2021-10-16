// @NOTE: Import from own files.
import { post } from "@actions/requests";
import { RESUMES_SIGN_UP_REQUEST } from "@constants/types/auth/sign-up";
import { IAction } from "@interfaces/action";

/**
 * ISignUpData - data that's used to sign up.
 */
export interface ISignUpData {
    email: string;
    password: string;
}

/**
 * signUp - returns objects that's used by axios middleware to
 * sign up user to the website.
 *
 * @param {object} body
 *
 * @returns {IAction}
 */
export default function signUp(body: object): IAction {
    return post(`/api/register`, RESUMES_SIGN_UP_REQUEST, body);
}
