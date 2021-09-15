// @NOTE: Import library functions.
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import {createLogger} from "redux-logger";
import rootReducer from "@reducers/root";

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

export default configureStore({});
