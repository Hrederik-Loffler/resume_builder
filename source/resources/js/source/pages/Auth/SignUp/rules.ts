// @NOTE: Import from libraries.
import * as yup from "yup";

export default yup.object().shape({
    email: yup.string().email().max(256).required("Email is required"),
    password: yup.string().max(256).required("Password is required"),
});
