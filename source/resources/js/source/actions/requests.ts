// @NOTE: Import from own files.
import IAction from "@interfaces/IAction";

/**
 * Get request object for redux-axions-middleware.
 *
 * @param {string} url
 * @param {string} type
 * @param {object} params
 *
 * @return {IAction}
 */
export function get(url: string, type: string, params: object = {}): IAction {
    return {
        type: type,
        payload: {
            request: {
                url: url,
                params: params,
            },
        },
    };
}

/**
 * Delete request object for redux-axions-middleware.
 *
 * @param {string} url
 * @param {string} type
 * @param {object} params
 *
 * @return {IAction}
 */
export function remove(
    url: string,
    type: string,
    params: object = {}
): IAction {
    return {
        type: type,
        payload: {
            request: {
                url: url,
                method: "DELETE",
                params: params,
            },
        },
    };
}

/**
 * Post request object for redux-axions-middleware.
 *
 * @param {string} url
 * @param {string} type
 * @param {object} params
 *
 * @return {IAction}
 */
export function post(url: string, type: string, data: object = {}): IAction {
    return {
        type: type,
        payload: {
            request: {
                url: url,
                method: "POST",
                data: data,
            },
        },
    };
}

/**
 * Put request object for redux-axions-middleware.
 *
 * @param {string} url
 * @param {string} type
 * @param {object} params
 *
 * @return {IAction}
 */
export function put(url: string, type: string, data: object = {}): IAction {
    return {
        type: type,
        payload: {
            request: {
                url: url,
                method: "PUT",
                data: data,
            },
        },
    };
}
