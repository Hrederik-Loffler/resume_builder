/**
 * IAction - represents `redux-axios-middleware` action.
 */
export interface IAction<T = any> {
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
            data: T;
            message: string;
        };
    };
}

/**
 * IReducerInitialState - represents fields that are shared between all
 * Redux reducers.
 */
export interface IReducerInitialState {
    loading: boolean;
    updating: boolean;
}

/**
 * IPaginatedResponse - represents part of response that returns paginated data.
 * It contains common fields for pagination, such as current page, etc.
 */
export interface IPaginatedResponse {
    first_page_url?: string;
    from: number;
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    current_page: number;
}
