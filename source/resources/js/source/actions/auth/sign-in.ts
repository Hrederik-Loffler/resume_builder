// @NOTE: Import from own files.
import { post } from "@actions/requests";
import { USER_SIGN_IN_REQUEST } from "@constants/types/auth/sign-in";
import { IAction } from "@actions/action";
import User from "@js/types/User";

/**
 * ISignInData - data that's used to sign in.
 */
export interface ISignInData {
    email: string;
    password: string;
}

/**
 * signIn - returns objects that's used by axios middleware to
 * sign in user to the website.
 *
 * @param {object} body
 *
 * @returns {IAction}
 */
export default function signIn(body: ISignInData): IAction<User> {
    return post(`/login`, USER_SIGN_IN_REQUEST, body);
}
