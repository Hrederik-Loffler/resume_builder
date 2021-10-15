// @NOTE: Import from libraries.
import { useCallback, useEffect } from "react";
import {
    Button,
    Card,
    Form,
    FormLayout,
    Layout,
    Page,
    Stack,
    Tag as PolarisTag,
    TextField,
} from "@shopify/polaris";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// @NOTE: Import from own files.
import routes from "@constants/routes";
import {
    loadResume,
    updateResume,
    IUpdateResumeProps,
} from "@actions/resumes/single";
import { IRootStore } from "@store/index";
import resumeDetailsResolver from "@pages/Resumes/Details/rules";
import ControllerTextField from "@components/forms/TextField";
import Tags from "@components/forms/Tags";

/**
 * IPageParams - path parameters used in details page.
 */
export interface IPageParams {
    id: string;
}

/**
 * ResumesDetails - page where admin can change details about a resume.
 *
 * @return {JSX.Element}
 */
export default function ResumeDetails() {
    // @NOTE: Router hooks.
    let { id } = useParams<IPageParams>();

    // @NOTE: Form hooks.
    const resume = useSelector((state: IRootStore) => state.resume);
    const methods = useForm<IUpdateResumeProps>({
        resolver: yupResolver(resumeDetailsResolver),
        mode: "onTouched",
    });
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitting, isValid },
    } = methods;
    const tags = useFieldArray<IUpdateResumeProps, "tags", "tagId">({
        control,
        name: "tags",
        keyName: "tagId",
    });

    // @NOTE: Misc. hooks.
    const dispatch = useDispatch();

    // @NOTE: Save changes function.
    const saveChanges: SubmitHandler<IUpdateResumeProps> = useCallback(
        async (data: IUpdateResumeProps) => {
            dispatch(updateResume(id, data));
        },
        []
    );

    // @NOTE: Add tag to tag list.
    const addTag = useCallback(() => {
        tags.append({
            name: getValues("tag"),
        });
        setValue("tag", "");
    }, []);

    // @NOTE: Remove tag from tag list.
    const removeTag = useCallback((key: number) => {
        tags.remove(key);
    }, []);

    // @NOTE: Load resumes.
    useEffect(() => {
        async function fetchData() {
            const resume = await dispatch(loadResume(id));
            reset(resume.payload.data?.data);
        }

        fetchData();
    }, []);

    // @NOTE: Should update button and input be disabled.
    const updateButtonDisabled =
        isSubmitting || !isValid || resume.updating || resume.loading;
    const addTagButtonDisabled =
        isSubmitting || !!errors.tag || resume.updating || resume.loading;
    const removeTagButtonDisabled = resume.updating;
    const updateInputDisabled = resume.updating || resume.loading;
    const tagsLoading = resume.loading;

    return (
        <Page
            title="Resume details"
            primaryAction={{
                content: "Update template",
                onAction: handleSubmit(saveChanges),
                disabled: updateButtonDisabled,
            }}
            divider
        >
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(saveChanges)}>
                    <Layout>
                        <Layout.AnnotatedSection
                            title="Resume basic information"
                            description="Give us essential information about resume template."
                        >
                            <Card sectioned>
                                <ControllerTextField
                                    label="Title"
                                    name="title"
                                    maxLength={64}
                                    showCharacterCount
                                    disabled={updateInputDisabled}
                                />
                                <ControllerTextField
                                    label="Description"
                                    name="description"
                                    maxLength={256}
                                    showCharacterCount
                                    disabled={updateInputDisabled}
                                />
                            </Card>
                        </Layout.AnnotatedSection>

                        <Layout.AnnotatedSection
                            title="Resume tags"
                            description="Users search templates by hashtags. You are advised to add a few hashtags so that users can find this template."
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <ControllerTextField
                                        label="Tag"
                                        name="tag"
                                        maxLength={32}
                                        showCharacterCount
                                        disabled={updateInputDisabled}
                                        connectedRight={
                                            <Button
                                                onClick={addTag}
                                                disabled={addTagButtonDisabled}
                                            >
                                                Add
                                            </Button>
                                        }
                                    />
                                    <Tags
                                        tags={tags.fields}
                                        onRemove={removeTag}
                                        loading={tagsLoading}
                                        disabled={removeTagButtonDisabled}
                                    />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>

                        <Layout.AnnotatedSection
                            title="Template"
                            description={
                                <p>
                                    Templates can be edited in resume editor.
                                    Click the right button to open new window
                                    where you can edit this template. Visit{" "}
                                    <Link
                                        to={`${routes.resumesEditor.base}/${id}`}
                                        target="_blank"
                                    >
                                        editor page
                                    </Link>
                                    .
                                </p>
                            }
                        />
                    </Layout>
                </Form>
            </FormProvider>
        </Page>
    );
}
