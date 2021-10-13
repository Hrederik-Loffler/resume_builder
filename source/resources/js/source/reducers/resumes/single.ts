// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
import IReducerInitialState from "@interfaces/IReducerInitialState";
import IAction from "@interfaces/IAction";
import Resume from "@js/types/Resume";

import {
    RESUME_REQUEST,
    RESUME_REQUEST_SUCCESS,
    RESUME_REQUEST_FAIL,
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
        case RESUME_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case RESUME_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            };

        case RESUME_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
            };

        default:
            break;
    }

    return state;
}
