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
            url: string;
        };
    };
}
