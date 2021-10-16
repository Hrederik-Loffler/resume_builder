// @NOTE: Import misc.
import { IAction, IReducerState } from "@actions/action";
import {
    USER_SIGN_IN_REQUEST,
    USER_SIGN_IN_REQUEST_SUCCESS,
    USER_SIGN_IN_REQUEST_FAIL,
} from "@constants/types/auth/sign-in";
import {
    USER_SIGN_UP_REQUEST,
    USER_SIGN_UP_REQUEST_SUCCESS,
    USER_SIGN_UP_REQUEST_FAIL,
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
        case USER_SIGN_IN_REQUEST:
        case USER_SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case USER_SIGN_IN_REQUEST_SUCCESS:
        case USER_SIGN_UP_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload?.data,
            };

        case USER_SIGN_IN_REQUEST_FAIL:
        case USER_SIGN_UP_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
            };

        default:
            break;
    }

    return state;
}
