// @NOTE: Import from libraries.
import * as yup from "yup";

export default yup.object().shape({
    title: yup.string().max(63).required("Title is required"),
    description: yup.string().max(255).required("Description is required"),
    tag: yup.string().max(31),
    tags: yup
        .array()
        .min(1, "At least one tag must be provided")
        .max(8, "You can add at most 8 tags to a single resume")
        .required("Tags are required"),
});
