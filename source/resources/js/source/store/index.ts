// @NOTE: Import library functions.
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axiosMiddleware from "redux-axios-middleware";
import axios, { AxiosError } from "axios";
import { createLogger } from "redux-logger";
import { StatusCodes } from "http-status-codes";

// @NOTE: Import misc.
import rootReducer from "@reducers/root";
import history from "@router/history";
import ToastService from "@services/ToastService";
import {
    IPaginatedResponse,
    IReducerState,
    IResponse,
} from "@interfaces/action";

import Resume from "@js/types/Resume";
import User from "@js/types/User";

// @NOTE: Create axios instance that will be used to make requests by `redux-axios-middleware`.
const client = axios.create({
    baseURL: "/api",
    responseType: "json",
    headers: {
        Accept: "application/json",
    },
});

// @NOTE: Define axios interceptors.
const axiosMiddlewareConfig = {
    interceptors: {
        returnRejectedPromiseOnError: true,
        response: [
            {
                // @NOTE: Handle errors according to their HTTP codes.
                error: (_: any, error: AxiosError<IResponse>) => {
                    switch (error.response?.status) {
                        // @NOTE: If the error code is the one below, redirect to home page and show error popup.
                        case StatusCodes.NOT_FOUND: {
                            history.push("/");
                            ToastService.error(error.response.statusText);
                            break;
                        }

                        // @NOTE: If the error code is the one below, redirect to sign in page and show error popup.
                        case StatusCodes.UNAUTHORIZED: {
                            history.push("/auth/sign-in");
                            ToastService.error(error.response.statusText);
                            break;
                        }

                        // @NOTE: By default, just show popup.
                        default: {
                            ToastService.error(
                                error.response
                                    ? error.response.data.message
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

let middleware = [
    thunkMiddleware,
    createLogger(),
    axiosMiddleware(client, axiosMiddlewareConfig),
];

const configureStore = (preloadedState: {} | undefined) =>
    createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

/**
 * IRootStore - declares all available entries in Redux store.
 */
export interface IRootStore {
    resumes: IReducerState<IPaginatedResponse<Resume[]>>;
    resume: IReducerState<Resume>;
    user: IReducerState<User>;
}

export default configureStore({});
