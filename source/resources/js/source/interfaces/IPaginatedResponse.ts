// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
import IResponse from "@interfaces/IResponse";

export default interface IPaginatedResponse extends IResponse {
    data: {
        current_page: number;
        per_page: number;
        total: number;
        links: {
            url?: string;
        }[];
    };
}
