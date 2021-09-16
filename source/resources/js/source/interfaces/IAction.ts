// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

export interface IActionPayloadRequest {
    url: string;
}

export interface IActionPayload {
    request: IActionPayloadRequest;
}

export default interface IAction {
    type: string;
    payload: IActionPayload;
}
