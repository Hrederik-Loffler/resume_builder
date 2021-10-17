// @NOTE: Import from own files.
import Job from "@js/types/Job";
import Education from "@js/types/Education";

/**
 * User - defines the structure of a user.
 */
type User = {
    email: string;
    first_name: string;
    second_name: string;
    phone: string;
    country: string;
    city: string;
    workExperiences: Job[];
    educations: Education[];
    accomplishments: string;
};

export default User;
