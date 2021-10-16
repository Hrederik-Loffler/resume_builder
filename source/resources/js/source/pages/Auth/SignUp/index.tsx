// @NOTE: Import from libraries.
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, Layout, Page } from "@shopify/polaris";
import { useCallback } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// @NOTE: Import from own files.
import { ISignInData } from "@actions/auth/sign-in";
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
    const methods = useForm<ISignInData>({
        resolver: yupResolver(signUpResolver),
        mode: "onTouched",
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
            const res = await dispatch(signUp(data));
            ToastService.success(res.payload?.data?.message);
            history.push(routes.home.url);
        },
        []
    );

    // @NOTE: Should update button and input be disabled.
    const signInButtonDisabled = isSubmitting || !isValid || user.loading;
    const signInInputDisabled = user.loading;

    return (
        <Page title="Sign up" divider>
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(saveChanges)}>
                    <Layout>
                        <Layout.AnnotatedSection
                            title="Your information"
                            description="Provide us with your email and password to log in."
                        >
                            <Card sectioned>
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
                                <Button primary submit>
                                    Sign in
                                </Button>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Form>
            </FormProvider>
        </Page>
    );
}
