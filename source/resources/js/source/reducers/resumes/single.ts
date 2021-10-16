// @NOTE: Import misc.
import { IAction, IReducerState } from "@actions/action";
import Resume from "@js/types/Resume";

import {
    RESUME_SINGLE_REQUEST,
    RESUME_SINGLE_REQUEST_SUCCESS,
    RESUME_SINGLE_REQUEST_FAIL,
    RESUME_UPDATE_REQUEST,
    RESUME_UPDATE_REQUEST_SUCCESS,
    RESUME_UPDATE_REQUEST_FAIL,
    RESUME_CREATE_REQUEST,
    RESUME_CREATE_REQUEST_SUCCESS,
    RESUME_CREATE_REQUEST_FAIL,
} from "@constants/types/resumes/single";

const resumeReducerInitialState: IReducerState<Resume> = {
    loading: false,
    updating: false,
    data: {
        message: "",
        data: {
            id: 1,
            title: "",
            description: "",
            image: "",
            tags: [],
        },
    },
};

/**
 * resumeReducer - Reducer that handles events that deal with a single resume.
 *
 * @param {IReducerState} state
 * @param {IAction} action
 *
 * @returns {IReducerState}
 */
export default function resumeReducer(
    state = resumeReducerInitialState,
    action: IAction<Resume>
): IReducerState<Resume> {
    switch (action.type) {
        case RESUME_SINGLE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case RESUME_UPDATE_REQUEST:
        case RESUME_CREATE_REQUEST:
            return {
                ...state,
                updating: true,
            };

        case RESUME_SINGLE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload?.data,
            };

        case RESUME_UPDATE_REQUEST_SUCCESS:
        case RESUME_CREATE_REQUEST_SUCCESS:
            return {
                ...state,
                updating: false,
            };

        case RESUME_SINGLE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
            };

        case RESUME_UPDATE_REQUEST_FAIL:
        case RESUME_CREATE_REQUEST_FAIL:
            return {
                ...state,
                updating: false,
            };

        default:
            break;
    }

    return state;
}
