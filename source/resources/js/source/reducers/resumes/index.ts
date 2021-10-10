// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
import IReducerInitialState from "@interfaces/IReducerInitialState";
import IAction from "@interfaces/IAction";
import IPaginatedResponse from "@interfaces/IPaginatedResponse";
import Resume from "@js/types/Resume";

import {
    RESUMES_LIST_REQUEST,
    RESUMES_LIST_REQUEST_SUCCESS,
    RESUMES_LIST_REQUEST_FAIL,
} from "@constants/types/resumes/list";

/**
 * IResumesPaginated - represents paginated list of resumes.
 */
type IResumesPaginated = {
    message: string;
    data: IPaginatedResponse & {
        data: Resume[];
    };
};

/**
 * ResumesAction - action that contains paginated list of resumes.
 */
type ResumesAction = IAction & {
    payload: {
        data: IResumesPaginated;
    };
};

/**
 * IResumesReducerState - interface that represents resumes state.
 * It contains list of resumes.
 */
export interface IResumesReducerState extends IReducerInitialState {
    data: IResumesPaginated;
}

const resumesReducerInitialState: IResumesReducerState = {
    loading: false,
    updating: false,
    data: {
        message: "",
        data: {
            from: 1,
            current_page: 1,
            data: [],
            path: "http://localhost:8090/api/resumes",
            per_page: 15,
            to: 1,
        },
    },
};

/**
 * resumesReducer - Reducer that handles events that deal with resumes.
 *
 * @param {IResumesReducerState} state
 * @param {IAction} action
 *
 * @returns {IResumesReducerState}
 */
export default function resumesReducer(
    state = resumesReducerInitialState,
    action: ResumesAction
): IResumesReducerState {
    switch (action.type) {
        case RESUMES_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case RESUMES_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            };

        case RESUMES_LIST_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
            };

        default:
            break;
    }

    return state;
}
