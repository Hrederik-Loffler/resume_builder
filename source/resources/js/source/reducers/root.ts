// @NOTE: Import library functions.
import { combineReducers } from "redux";

// @NOTE: Import from own files.
import resumes from "@reducers/resumes/";
import resume from "@reducers/resumes/single";
import user from "@reducers/auth/user";
import profile from "@reducers/auth/profile";

const rootReducer = combineReducers({
    resumes,
    resume,
    user,
    profile,
});

export default rootReducer;
