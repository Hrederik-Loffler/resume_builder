// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

export default interface IAction {
    type: string;
    payload: {
        request: {
            method?: string;
            url: string;
            data?: object;
            params?: object;
            headers?: object;
        };
        data?: {
            data: object;
        };
    };
}
