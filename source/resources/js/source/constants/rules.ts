// @NOTE: Import from libraries.
import * as yup from "yup";

// @NOTE: Import from own files.
import regex from "@constants/regex";

export default {
    first_name: yup.string().required("First name is required").max(31),
    second_name: yup.string().required("Second name is required").max(31),
    email: yup
        .string()
        .email("Email must a valid email")
        .max(255)
        .required("Email is required"),
    phone: yup.string().matches(regex.phone, "Phone number has invalid format"),
    password: yup
        .string()
        .max(255)
        .required("Password is required")
        .matches(
            regex.password,
            "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character (@, $, !, %, *, #, ?, &)"
        ),
    confirm_password: yup
        .string()
        .max(255)
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    country: yup.string().required("Country is required").max(63),
    city: yup.string().required("Country is required").max(255),
};
