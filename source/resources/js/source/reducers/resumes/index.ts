// @NOTE: Import misc.
import { IAction, IPaginatedResponse, IReducerState } from "@actions/action";
import Resume from "@js/types/Resume";
import {
    RESUMES_LIST_REQUEST,
    RESUMES_LIST_REQUEST_SUCCESS,
    RESUMES_LIST_REQUEST_FAIL,
} from "@constants/types/resumes/list";

const resumesReducerInitialState: IReducerState<IPaginatedResponse<Resume[]>> =
    {
        loading: false,
        updating: false,
        data: {
            message: "",
            data: {
                from: 1,
                current_page: 1,
                data: [],
                path: "",
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
    action: IAction<IPaginatedResponse<Resume[]>>
): IReducerState<IPaginatedResponse<Resume[]>> {
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
                data: action.payload?.data,
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
