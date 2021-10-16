/**
 * IResponse - represents axios response object.
 */
export interface IResponse<T = any> {
    data: T;
    message: string;
}

/**
 * IAction - represents `redux-axios-middleware` action.
 */
export interface IAction<T = any> {
    type: string;
    // @NOTE: `payload` is undefined when error server returns error (404, 422, etc).
    payload?: {
        request: {
            method?: string;
            url: string;
            data?: object;
            params?: object;
            headers?: object;
        };
        data?: IResponse<T>;
    };
}

/**
 * IReducerState - represents fields that are shared between all
 * Redux reducers.
 */
export interface IReducerState<T = any> {
    loading: boolean;
    updating: boolean;
    data?:
        | undefined
        | {
              data: T;
              message: string;
          };
}

/**
 * IPaginatedResponse - represents part of response that returns paginated data.
 * It contains common fields for pagination, such as current page, etc.
 */
export interface IPaginatedResponse<T = any> {
    first_page_url?: string;
    from: number;
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    current_page: number;
    data: T;
}
