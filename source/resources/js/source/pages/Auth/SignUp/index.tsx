// @NOTE: Import from libraries.
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, FormLayout, Layout, Page } from "@shopify/polaris";
import { Fragment, useCallback } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// @NOTE: Import from own files.
import { ISignUpData } from "@actions/auth/sign-up";
import signUpResolver from "@pages/Auth/SignUp/rules";
import signUp from "@actions/auth/sign-up";
import ToastService from "@services/ToastService";
import routes from "@constants/routes";
import ControllerTextField from "@components/forms/TextField";
import { IRootStore } from "@store/index";

/**
 * SignIn - page that's to sign in to the website.
 *
 * @return {JSX.Element}
 */
export default function SignUp() {
    // @NOTE: Form hooks.
    const methods = useForm<ISignUpData>({
        resolver: yupResolver(signUpResolver),
        mode: "onChange",
    });
    const {
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    // @NOTE: Misc. hooks.
    const user = useSelector((state: IRootStore) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    // @NOTE: Save changes function.
    const saveChanges: SubmitHandler<ISignUpData> = useCallback(
        async (data: ISignUpData) => {
            const res = await dispatch(signUp(data));

            // @NOTE: Successfully authenticated.
            if (res.payload?.data) {
                window.user = res.payload.data.data;
                ToastService.success(res.payload?.data?.message);
                history.push(routes.home.url);
            }
        },
        []
    );

    // @NOTE: Should update button and input be disabled.
    const signUpButtonDisabled = isSubmitting || !isValid || user.loading;
    const signUpInputDisabled = user.loading;

    return (
        <Page title="Sign up" divider>
            <FormProvider {...methods}>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Your information"
                        description={
                            <Fragment>
                                <p>
                                    Provide us with your email and password to
                                    log in. Already have an account? Go to{" "}
                                    <Link to={routes.authSignIn.url}>
                                        sign in
                                    </Link>{" "}
                                    page.
                                </p>
                            </Fragment>
                        }
                    >
                        <Card sectioned>
                            <Form onSubmit={handleSubmit(saveChanges)}>
                                <FormLayout>
                                    <FormLayout.Group>
                                        <ControllerTextField
                                            label="First name"
                                            name="first_name"
                                            maxLength={31}
                                            showCharacterCount
                                            disabled={signUpInputDisabled}
                                        />
                                        <ControllerTextField
                                            label="Second name"
                                            name="second_name"
                                            maxLength={31}
                                            showCharacterCount
                                            disabled={signUpInputDisabled}
                                        />
                                    </FormLayout.Group>
                                    <ControllerTextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        maxLength={255}
                                        showCharacterCount
                                        disabled={signUpInputDisabled}
                                    />
                                    <ControllerTextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        maxLength={255}
                                        showCharacterCount
                                        disabled={signUpInputDisabled}
                                    />
                                    <ControllerTextField
                                        label="Confirm password"
                                        name="password_confirmation"
                                        type="password"
                                        maxLength={255}
                                        showCharacterCount
                                        disabled={signUpInputDisabled}
                                    />
                                    <Button
                                        primary
                                        submit
                                        disabled={signUpButtonDisabled}
                                    >
                                        Sign up
                                    </Button>
                                </FormLayout>
                            </Form>
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </FormProvider>
        </Page>
    );
}
