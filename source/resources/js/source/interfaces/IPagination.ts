// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

export interface IPaginationLink {
    url?: string;
}

export default interface IPagination {
    current_page: number;
    per_page: number;
    total: number;
    links: IPaginationLink[];
}
