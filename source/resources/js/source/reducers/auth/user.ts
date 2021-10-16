// @NOTE: Import misc.
import { IAction, IReducerState } from "@interfaces/action";
import User from "@js/types/User";
import {
    RESUMES_SIGN_IN_REQUEST,
    RESUMES_SIGN_IN_REQUEST_SUCCESS,
    RESUMES_SIGN_IN_REQUEST_FAIL,
} from "@constants/types/auth/sign-in";

const resumesReducerInitialState: IReducerState<User> = {
    loading: false,
    updating: false,
    data: {
        message: "",
        data: {
            email: "",
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
    action: IAction<User>
): IReducerState<User> {
    switch (action.type) {
        case RESUMES_SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case RESUMES_SIGN_IN_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload?.data,
            };

        case RESUMES_SIGN_IN_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
            };

        default:
            break;
    }

    return state;
}
