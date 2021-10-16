// @NOTE: Import misc.
import { IAction, IReducerState } from "@interfaces/action";
import User from "@js/types/User";
import {
    RESUMES_SIGN_IN_REQUEST,
    RESUMES_SIGN_IN_REQUEST_SUCCESS,
    RESUMES_SIGN_IN_REQUEST_FAIL,
} from "@constants/types/auth/sign-in";
import {
    RESUMES_SIGN_UP_REQUEST,
    RESUMES_SIGN_UP_REQUEST_SUCCESS,
    RESUMES_SIGN_UP_REQUEST_FAIL,
} from "@constants/types/auth/sign-up";

export interface IUserState {
    email: string;
    first_name?: string;
    second_name?: string;
    password: string;
    password_confirmation?: string;
}

const resumesReducerInitialState: IReducerState<IUserState> = {
    loading: false,
    updating: false,
    data: {
        message: "",
        data: {
            email: "",
            first_name: "",
            second_name: "",
            password: "",
            password_confirmation: "",
        },
    },
};

/**
 * authReducer - Reducer that handles events that deal with user.
 *
 * @param {IResumesReducerState} state
 * @param {IAction} action
 *
 * @returns {IResumesReducerState}
 */
export default function authReducer(
    state = resumesReducerInitialState,
    action: IAction<IUserState>
): IReducerState<IUserState> {
    switch (action.type) {
        case RESUMES_SIGN_IN_REQUEST:
        case RESUMES_SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case RESUMES_SIGN_IN_REQUEST_SUCCESS:
        case RESUMES_SIGN_UP_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload?.data,
            };

        case RESUMES_SIGN_IN_REQUEST_FAIL:
        case RESUMES_SIGN_UP_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
            };

        default:
            break;
    }

    return state;
}
