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
    phone: yup
        .string()
        .test(
            "phone-number",
            "Phone number has invalid format",
            (v) => !v || regex.phone.test(v as string) // @NOTE: Either empty or valid phone number.
        )
        .nullable(true),
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
    country: yup.string().max(63).nullable(true),
    city: yup.string().max(255).nullable(true),
};
