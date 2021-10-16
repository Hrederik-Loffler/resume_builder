// @NOTE: Import from libraries.
import * as yup from "yup";

// @NOTE: Import from own files.
import regex from "@constants/regex";

export default yup.object().shape({
    email: yup
        .string()
        .email("Email must a valid email")
        .max(256)
        .required("Email is required"),
    password: yup
        .string()
        .max(256)
        .required("Password is required")
        .matches(
            regex.password,
            "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character (@, $, !, %, *, #, ?, &)"
        ),
});
