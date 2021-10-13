// @NOTE: Import library functions.
import { combineReducers } from "redux";

// @NOTE: Import from own files.
import resumes from "@reducers/resumes/index";
import resume from "@reducers/resumes/single";

const rootReducer = combineReducers({
    resumes,
    resume,
});

export default rootReducer;
