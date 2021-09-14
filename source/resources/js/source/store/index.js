import { applyMiddleware, createStore } from "redux";
import rootReducer from "@reducers/root";
import { createLogger } from "redux-logger/src";
import thunkMiddleware from 'redux-thunk';
import _ from 'lodash';
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { showToast } from "../actions/appActions";

const loggerMiddleware = createLogger();

const client = axios.create({
   responseType: 'json'
});

const middlewareConfig = {
    interceptors: {
        request: [({getState, dispatch, getSourceAction}, config) => config],
        response: [
            {
                success: ({getState, dispatch, getSourceAction}, response) => response,
                error: ({ dispatch }, error) => {
                    _.has(error, 'response.data.errors') &&
                    error.response.status < 500 &&
                    dispatch(showToast(error.response.data.errors.join("\r\n"), true));

                    return Promise.reject(error)
                }
            }
        ]
    },
    returnRejectedPromiseOnError: true
};

let middleware = [thunkMiddleware, loggerMiddleware, axiosMiddleware(client, middlewareConfig)]

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
)
export default configureStore();
