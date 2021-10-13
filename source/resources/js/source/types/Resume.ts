// @NOTE: Import library functions.
// {...}

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
import Tag from "@js/types/Tag";

type Resume = {
    id: number;
    image: string;
    title: string;
    description: string;
    tags?: Tag[];
};

export default Resume;
