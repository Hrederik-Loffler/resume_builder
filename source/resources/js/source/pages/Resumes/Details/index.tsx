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
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// @NOTE: Import from own files.
import routes from "@constants/routes";
import {
    loadResume,
    updateResume,
    IUpdateResumeProps,
} from "@actions/resumes/single";
import { IRootStore } from "@store/index";

export interface IPageParams {
    id: string;
}

export const resumeDetailsResolver = yup.object().shape({
    title: yup.string().max(64).required("Title is required"),
    description: yup.string().max(256).required("Description is required"),
    tag: yup.string().max(32),
});

/**
 * ResumesDetails - page where admin can change details about a resume.
 *
 * @return {JSX.Element}
 */
export default function ResumeDetails() {
    // @NOTE: Router hooks.
    let { id } = useParams<IPageParams>();

    // @NOTE: Misc. hooks.
    const dispatch = useDispatch();
    const resume = useSelector((state: IRootStore) => state.resume);
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<IUpdateResumeProps>({
        resolver: yupResolver(resumeDetailsResolver),
        mode: "onTouched",
    });
    const tags = useFieldArray<IUpdateResumeProps, "tags", "tagId">({
        control,
        name: "tags",
        keyName: "tagId",
    });

    // @NOTE: Should update button and input be disabled.
    const updateButtonDisabled = () => isSubmitting || !isValid;
    const addTagButtonDisabled = () =>
        isSubmitting || !!errors.tag || resume.updating || resume.loading;
    const updateInputDisabled = () => resume.updating || resume.loading;

    // @NOTE: Save changes function.
    const saveChanges: SubmitHandler<IUpdateResumeProps> = async (
        data: IUpdateResumeProps
    ) => {
        dispatch(updateResume(id, data));
    };

    // @NOTE: Load resumes.
    useEffect(() => {
        async function fetchData() {
            const resume = await dispatch(loadResume(id));
            reset(resume.payload.data?.data);
        }

        fetchData();
    }, []);

    return (
        <Page
            title="Resume details"
            primaryAction={{
                content: "Update template",
                onAction: handleSubmit(saveChanges),
                disabled: updateButtonDisabled(),
            }}
            divider
        >
            <Form onSubmit={handleSubmit(saveChanges)}>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Resume basic information"
                        description="Give us essential information about resume template."
                    >
                        <Card sectioned>
                            {/* @TODO: Move Controller to a separate component + use useFormContext hook */}
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            maxLength={64}
                                            showCharacterCount
                                            type="text"
                                            error={
                                                errors.title?.message || false
                                            }
                                            label="Title"
                                            disabled={updateInputDisabled()}
                                        />
                                    );
                                }}
                            />

                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            maxLength={256}
                                            showCharacterCount
                                            type="text"
                                            error={
                                                errors.description?.message ||
                                                false
                                            }
                                            label="Description"
                                            disabled={updateInputDisabled()}
                                        />
                                    );
                                }}
                            />
                        </Card>
                    </Layout.AnnotatedSection>

                    <Layout.AnnotatedSection
                        title="Resume tags"
                        description="Users search templates by hashtags. You are advised to add a few hashtags so that users can find this template."
                    >
                        <Card sectioned>
                            <FormLayout>
                                <Controller
                                    name="tag"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                {...field}
                                                maxLength={32}
                                                showCharacterCount
                                                type="text"
                                                label="Tags"
                                                disabled={updateInputDisabled()}
                                                connectedRight={
                                                    <Button
                                                        onClick={() => {
                                                            tags.append({
                                                                name: field.value,
                                                            });
                                                        }}
                                                        disabled={addTagButtonDisabled()}
                                                    >
                                                        Add
                                                    </Button>
                                                }
                                            />
                                        );
                                    }}
                                />
                                <Stack spacing="tight">
                                    {tags.fields.map((tag, key) => {
                                        return (
                                            <PolarisTag
                                                key={key}
                                                onRemove={() =>
                                                    tags.remove(key)
                                                }
                                            >
                                                {tag.name}
                                            </PolarisTag>
                                        );
                                    })}
                                </Stack>
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>

                    <Layout.AnnotatedSection
                        title="Template"
                        description={
                            <p>
                                Templates can be edited in resume editor. Click
                                the right button to open new window where you
                                can edit this template. Visit{" "}
                                <Link
                                    to={`${routes.resumesEditor.base}/${id}`}
                                    target="_blank"
                                >
                                    editor page
                                </Link>
                                .
                            </p>
                        }
                    ></Layout.AnnotatedSection>
                </Layout>
            </Form>
        </Page>
    );
}
