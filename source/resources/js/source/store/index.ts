// @NOTE: Import library functions.
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axiosMiddleware from "redux-axios-middleware";
import axios, { AxiosError } from "axios";
import { createLogger } from "redux-logger";
import { StatusCodes } from "http-status-codes";

// @NOTE: Import misc.
import rootReducer from "@reducers/root";
import { IResumesReducerState } from "@reducers/resumes";
import { IResumeReducerState } from "@reducers/resumes/single";
import history from "@router/history";
import ToastService from "@services/ToastService";

const client = axios.create({
    baseURL: "/api",
    responseType: "json",
    headers: {
        Accept: "application/json",
    },
});

const axiosMiddlewareConfig = {
    interceptors: {
        returnRejectedPromiseOnError: true,
        response: [
            {
                // @NOTE: Handle errors according to their HTTP codes.
                error: (_: any, error: AxiosError) => {
                    switch (error.response?.status) {
                        // @NOTE: If the error code is the one below, redirect to home page and show error popup.
                        case StatusCodes.UNAUTHORIZED:
                        case StatusCodes.NOT_FOUND: {
                            history.push("/");
                            ToastService.error(error.response.statusText);
                            break;
                        }

                        // @NOTE: By default, just show popup.
                        default: {
                            ToastService.error(
                                error.response
                                    ? error.response.statusText
                                    : "Unknown error has occured"
                            );
                            break;
                        }
                    }
                },
            },
        ],
    },
};

const loggerMiddleware = createLogger();

let middleware = [
    thunkMiddleware,
    loggerMiddleware,
    axiosMiddleware(client, axiosMiddlewareConfig),
];

const configureStore = (preloadedState: {} | undefined) =>
    createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

/**
 * IRootStore - declares all available entries in Redux store.
 */
export interface IRootStore {
    resumes: IResumesReducerState;
    resume: IResumeReducerState;
}

export default configureStore({});
