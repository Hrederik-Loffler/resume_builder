// @NOTE: Import library functions.
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, FormLayout, Layout, Page, Button } from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
    FormProvider,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

// @NOTE: Import from own files.
import { IProfileData, updateProfile } from "@actions/auth/profile";
import profileResolver from "@pages/Profile/rules";
import ControllerTextField from "@components/forms/TextField";
import { IRootStore } from "@store/index";
import ToastService from "@services/ToastService";
import useAuth from "@js/hooks/useAuth";
import User from "@js/types/User";

/**
 * Profile - page where users can fill data to update their profiles.
 *
 * @returns {JSX.Element}
 */
export default function Profile() {
    // @NOTE: Misc. hooks.
    const profile = useSelector((state: IRootStore) => state.profile);
    const dispatch = useDispatch();
    const user = useAuth() as User;

    // @NOTE: State hooks.
    const [defaultValues, setDefaultValues] = useState<IProfileData>(user);

    // @NOTE: Form hooks.
    const methods = useForm<IProfileData>({
        resolver: yupResolver(profileResolver),
        mode: "onTouched",
        defaultValues,
    });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, isValid, errors },
    } = methods;

    const jobs = useFieldArray<
        IProfileData,
        "workExperiences",
        "workExperienceId"
    >({
        control,
        name: "workExperiences",
        keyName: "workExperienceId",
    });

    const educations = useFieldArray<IProfileData, "educations", "educationId">(
        {
            control,
            name: "educations",
            keyName: "educationId",
        }
    );

    // @NOTE: Save user profile.
    const saveChanges: SubmitHandler<IProfileData> = useCallback(
        async (data: IProfileData) => {
            const res = await dispatch(updateProfile(data));

            // @NOTE: Successfully authenticated.
            if (res.payload?.data) {
                // window.user = res.payload.data.data;
                console.log(res.payload);

                ToastService.success(res.payload?.data?.message);
            }
        },
        []
    );

    // @NOTE: Should update button and input be disabled.
    const updateButtonDisabled =
        isSubmitting || !isValid || profile.updating || profile.loading;
    const updateInputDisabled = profile.updating || profile.loading;
    const addEducationsButtonDisabled =
        profile.updating ||
        profile.loading ||
        educations.fields.length > 8 ||
        !!errors.educations;
    const addWorkExperiencesButtonDisabled =
        profile.updating ||
        profile.loading ||
        jobs.fields.length > 8 ||
        !!errors.workExperiences;

    return (
        <Page
            title="Profile"
            primaryAction={{
                content: "Update",
                disabled: updateButtonDisabled,
                onAction: handleSubmit(saveChanges),
            }}
            divider
        >
            <FormProvider {...methods}>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Your information"
                        description="Give us essential information about yourself."
                    >
                        <Card sectioned>
                            <FormLayout>
                                <FormLayout.Group>
                                    <ControllerTextField
                                        label="First name"
                                        name="first_name"
                                        maxLength={31}
                                        showCharacterCount
                                        disabled={updateInputDisabled}
                                    />
                                    <ControllerTextField
                                        label="Second name"
                                        name="second_name"
                                        maxLength={31}
                                        showCharacterCount
                                        disabled={updateInputDisabled}
                                    />
                                </FormLayout.Group>

                                <ControllerTextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    maxLength={255}
                                    showCharacterCount
                                    disabled={updateInputDisabled}
                                />
                                <ControllerTextField
                                    label="Phone"
                                    name="phone"
                                    disabled={updateInputDisabled}
                                />

                                <FormLayout.Group>
                                    <ControllerTextField
                                        label="Country"
                                        name="country"
                                        maxLength={63}
                                        showCharacterCount
                                        disabled={updateInputDisabled}
                                    />
                                    <ControllerTextField
                                        label="City"
                                        name="city"
                                        maxLength={255}
                                        showCharacterCount
                                        disabled={updateInputDisabled}
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>

                    <Layout.AnnotatedSection
                        title="Work Experience"
                        description="Try to include number of work experiences between 1-2. Also, avoid including work experiences that are too old (for example, 10 years ago)."
                    >
                        <FormLayout>
                            {jobs.fields.map((job, key) => {
                                return (
                                    <Card
                                        key={key}
                                        sectioned
                                        secondaryFooterActions={[
                                            {
                                                content: "Remove",
                                                destructive: true,
                                                onAction: () =>
                                                    jobs.remove(key),
                                            },
                                        ]}
                                    >
                                        <FormLayout>
                                            <ControllerTextField
                                                label="Job title"
                                                name={`workExperiences.${key}.title`}
                                                maxLength={255}
                                                showCharacterCount
                                                disabled={updateInputDisabled}
                                            />

                                            <FormLayout.Group>
                                                <ControllerTextField
                                                    type="date"
                                                    label="Start date"
                                                    name={`workExperiences.${key}.since`}
                                                    disabled={
                                                        updateInputDisabled
                                                    }
                                                />
                                                <ControllerTextField
                                                    type="date"
                                                    label="End date"
                                                    name={`workExperiences.${key}.until`}
                                                    disabled={
                                                        updateInputDisabled
                                                    }
                                                />
                                            </FormLayout.Group>

                                            <ControllerTextField
                                                label="Responsibilites"
                                                name={`workExperiences.${key}.responsibilities`}
                                                disabled={updateInputDisabled}
                                                maxLength={1023}
                                                showCharacterCount
                                                multiline={8}
                                            />
                                        </FormLayout>
                                    </Card>
                                );
                            })}
                            <Button
                                fullWidth
                                onClick={() => jobs.append({})}
                                disabled={addWorkExperiencesButtonDisabled}
                            >
                                Add work experience
                            </Button>
                        </FormLayout>
                    </Layout.AnnotatedSection>

                    <Layout.AnnotatedSection title="Education">
                        <FormLayout>
                            {educations.fields.map((education, key) => {
                                return (
                                    <Card
                                        key={key}
                                        sectioned
                                        secondaryFooterActions={[
                                            {
                                                content: "Remove",
                                                destructive: true,
                                                onAction: () =>
                                                    educations.remove(key),
                                            },
                                        ]}
                                    >
                                        <FormLayout>
                                            <ControllerTextField
                                                label="School name"
                                                name={`educations.${key}.school`}
                                                maxLength={255}
                                                showCharacterCount
                                                disabled={updateInputDisabled}
                                            />
                                            <ControllerTextField
                                                label="Degree"
                                                name={`educations.${key}.degree`}
                                                maxLength={255}
                                                showCharacterCount
                                                disabled={updateInputDisabled}
                                            />

                                            <FormLayout.Group>
                                                <ControllerTextField
                                                    label="Start date"
                                                    type="date"
                                                    name={`educations.${key}.since`}
                                                    disabled={
                                                        updateInputDisabled
                                                    }
                                                />
                                                <ControllerTextField
                                                    label="End date"
                                                    type="date"
                                                    name={`educations.${key}.until`}
                                                    disabled={
                                                        updateInputDisabled
                                                    }
                                                />
                                            </FormLayout.Group>
                                        </FormLayout>
                                    </Card>
                                );
                            })}
                            <Button
                                fullWidth
                                onClick={() => educations.append({})}
                                disabled={addEducationsButtonDisabled}
                            >
                                Add education
                            </Button>
                        </FormLayout>
                    </Layout.AnnotatedSection>

                    <Layout.AnnotatedSection title="Professional Accomplishments">
                        <Card sectioned>
                            <ControllerTextField
                                label="Accomplishments"
                                name={`accomplishments`}
                                maxLength={1023}
                                showCharacterCount
                                multiline={8}
                                disabled={updateInputDisabled}
                            />
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </FormProvider>
        </Page>
    );
}
