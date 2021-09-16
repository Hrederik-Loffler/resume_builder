// @NOTE: Import library functions.
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import {createLogger} from "redux-logger";


// @NOTE: Import misc.
import rootReducer from "@reducers/root";
import { IResumesReducerState } from "@reducers/resumes";

const client = axios.create({
    baseURL: '/api',
    responseType: 'json',
});

const loggerMiddleware = createLogger();

let middleware = [thunkMiddleware, loggerMiddleware, axiosMiddleware(client)]

const configureStore = (preloadedState: {} | undefined) => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
)

export interface IRootStore {
    resumes: IResumesReducerState;
}

export default configureStore({});
