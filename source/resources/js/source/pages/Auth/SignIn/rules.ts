// @NOTE: Import from libraries.
import * as yup from "yup";

// @NOTE: Import from own files.
import rules from "@constants/rules";

export default yup.object().shape({
    email: rules.email,
    password: rules.password,
});
