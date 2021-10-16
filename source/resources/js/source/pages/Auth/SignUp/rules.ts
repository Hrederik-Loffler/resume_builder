// @NOTE: Import from libraries.
import * as yup from "yup";

// @NOTE: Import from own files.
import rules from "@constants/rules";

export default yup.object().shape({
    first_name: rules.first_name,
    second_name: rules.second_name,
    email: rules.email,
    password: rules.password,
    password_confirmation: rules.confirm_password,
});
