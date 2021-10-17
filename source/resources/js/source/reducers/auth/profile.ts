// @NOTE: Import misc.
import { IAction, IReducerState } from "@actions/action";
import { IProfileData } from "@actions/auth/profile";
import {
    RESUMES_PROFILE_REQUEST,
    RESUMES_PROFILE_REQUEST_SUCCESS,
    RESUMES_PROFILE_REQUEST_FAIL,
} from "@constants/types/auth/profile";

const resumesReducerInitialState: IReducerState<IProfileData> = {
    loading: false,
    updating: false,
    data: {
        message: "",
        data: {
            email: "",
            first_name: "",
            second_name: "",
            phone: "",
            country: "",
            city: "",
            workExperiences: [],
            educations: [],
            accomplishments: "",
        },
    },
};

/**
 * profileReducer - Reducer that handles events that deal with user's profile.
 *
 * @param {IResumesReducerState} state
 * @param {IAction} action
 *
 * @returns {IResumesReducerState}
 */
export default function profileReducer(
    state = resumesReducerInitialState,
    action: IAction<IProfileData>
): IReducerState<IProfileData> {
    switch (action.type) {
        case RESUMES_PROFILE_REQUEST:
            return {
                ...state,
                updating: true,
            };

        case RESUMES_PROFILE_REQUEST_SUCCESS:
            return {
                ...state,
                updating: false,
                data: action.payload?.data,
            };

        case RESUMES_PROFILE_REQUEST_FAIL:
            return {
                ...state,
                updating: false,
            };

        default:
            break;
    }

    return state;
}
