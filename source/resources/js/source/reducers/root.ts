// @NOTE: Import library functions.
import { combineReducers } from 'redux';
import resumes from '@reducers/resumes/index';

const rootReducer = combineReducers({
    resumes
})
export default rootReducer;
