// @NOTE: Import from libraries.
import * as yup from "yup";

export default yup.object().shape({
    title: yup.string().max(64).required("Title is required"),
    description: yup.string().max(256).required("Description is required"),
    tag: yup.string().max(32),
});
