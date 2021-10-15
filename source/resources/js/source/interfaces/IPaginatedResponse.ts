/**
 * IPaginatedResponse - represents part of response that returns paginated data.
 * It contains common fields for pagination, such as current page, etc.
 */
export default interface IPaginatedResponse {
    first_page_url?: string;
    from: number;
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    current_page: number;
}
