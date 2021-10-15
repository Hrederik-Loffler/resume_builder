/**
 * IAction - represents `redux-axios-middleware` action.
 */
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
