// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
import IReducerInitialState from "@interfaces/IReducerInitialState";
import IAction from "@interfaces/IAction";
import Resume from "@js/types/Resume";

import {
    RESUME_SINGLE_REQUEST,
    RESUME_SINGLE_REQUEST_SUCCESS,
    RESUME_SINGLE_REQUEST_FAIL,
    RESUME_UPDATE_REQUEST,
    RESUME_UPDATE_REQUEST_SUCCESS,
    RESUME_UPDATE_REQUEST_FAIL,
} from "@constants/types/resumes/single";

/**
 * IResumesPaginated - represents paginated a single resume.
 */
type IResumeReponse = {
    message: string;
    data: Resume;
};

/**
 * ResumesAction - action that contains paginated a single resume.
 */
type ResumesAction = IAction & {
    payload: {
        data: IResumeReponse;
    };
};

/**
 * IResumeReducerState - interface that represents a single resume state.
 */
export interface IResumeReducerState extends IReducerInitialState {
    data: {
        message: string;
        data: Resume;
    };
}

const resumeReducerInitialState: IResumeReducerState = {
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
 * @param {IResumeReducerState} state
 * @param {IAction} action
 *
 * @returns {IResumeReducerState}
 */
export default function resumeReducer(
    state = resumeReducerInitialState,
    action: ResumesAction
): IResumeReducerState {
    switch (action.type) {
        case RESUME_SINGLE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case RESUME_UPDATE_REQUEST:
            return {
                ...state,
                updating: true,
            };

        case RESUME_SINGLE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            };

        case RESUME_UPDATE_REQUEST_SUCCESS:
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
            return {
                ...state,
                updating: false,
            };

        default:
            break;
    }

    return state;
}
