// @NOTE: Import from libraries.
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Button, Card, Form, FormLayout, Layout, Page } from "@shopify/polaris";
import { Fragment, useCallback } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// @NOTE: Import from own files.
import { ISignInData } from "@actions/auth/sign-in";
import signInResolver from "@pages/Auth/SignIn/rules";
import signIn from "@actions/auth/sign-in";
import ToastService from "@services/ToastService";
import routes from "@constants/routes";
import ControllerTextField from "@components/forms/TextField";
import { IRootStore } from "@store/index";

/**
 * SignIn - page that's to sign in to the website.
 *
 * @return {JSX.Element}
 */
export default function SignIn() {
    // @NOTE: Form hooks.
    const methods = useForm<ISignInData>({
        resolver: yupResolver(signInResolver),
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
    const saveChanges: SubmitHandler<ISignInData> = useCallback(
        async (data: ISignInData) => {
            const res = await dispatch(signIn(data));

            // @NOTE: Successfully authenticated.
            if (res.payload) {
                ToastService.success(res.payload?.data?.message);
                history.push(routes.home.url);
            }
        },
        []
    );

    // @NOTE: Should update button and input be disabled.
    const signInButtonDisabled = isSubmitting || !isValid || user.loading;
    const signInInputDisabled = user.loading;

    return (
        <Page title="Sign in" divider>
            <FormProvider {...methods}>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Your information"
                        description={
                            <Fragment>
                                <p>
                                    Provide us with your email and password to
                                    log in. Don't have an account? Go to{" "}
                                    <Link to={routes.authSignUp.url}>
                                        sign up
                                    </Link>{" "}
                                    page.
                                </p>
                            </Fragment>
                        }
                    >
                        <Card sectioned>
                            <Form onSubmit={handleSubmit(saveChanges)}>
                                <FormLayout>
                                    <ControllerTextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        maxLength={256}
                                        showCharacterCount
                                        disabled={signInInputDisabled}
                                    />
                                    <ControllerTextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        maxLength={256}
                                        showCharacterCount
                                        disabled={signInInputDisabled}
                                    />
                                    <Button
                                        primary
                                        submit
                                        disabled={signInButtonDisabled}
                                    >
                                        Sign in
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
