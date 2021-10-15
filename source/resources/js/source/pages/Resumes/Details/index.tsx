// @NOTE: Import from libraries.
import { useCallback, useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
    FormLayout,
    TextField as PolarisTextField,
    Layout,
    Page,
} from "@shopify/polaris";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    FormProvider,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";

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
    // @NOTE: State hooks.
    const [defaultValues, setDefaultValues] = useState<IUpdateResumeProps>({
        title: "",
        description: "",
        tags: [],
    });

    // @NOTE: Move this to a separate state variable, because `react-hook-form` would
    // treat it as part of form state which breaks `dirtyFields` field.
    const [tagInput, setTagInput] = useState("");

    // @NOTE: Router hooks.
    let { id } = useParams<IPageParams>();

    // @NOTE: Form hooks.
    const resume = useSelector((state: IRootStore) => state.resume);
    const methods = useForm<IUpdateResumeProps>({
        resolver: yupResolver(resumeDetailsResolver),
        mode: "onTouched",
        defaultValues,
    });
    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors, isSubmitting, isValid, dirtyFields },
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
            const values = getValues();
            setDefaultValues(values);
            reset(values);
        },
        []
    );

    // @NOTE: Add tag to tag list.
    const addTag = () => {
        tags.append({
            name: tagInput,
        });
        setTagInput("");
    };

    // @NOTE: Remove tag from tag list.
    const removeTag = useCallback((key: number) => {
        tags.remove(key);
    }, []);

    // @NOTE: Load resumes.
    useEffect(() => {
        async function fetchData() {
            const res = await dispatch(loadResume(id));
            const resume = res.payload.data?.data as IUpdateResumeProps;
            reset(resume);
            setDefaultValues(resume);
        }

        fetchData();
    }, []);

    // @NOTE: Should update button and input be disabled.
    const updateButtonDisabled =
        isSubmitting ||
        !isValid ||
        _.isEmpty(dirtyFields) ||
        resume.updating ||
        resume.loading;
    const addTagButtonDisabled =
        isSubmitting || !tagInput || resume.updating || resume.loading;
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
                                    <PolarisTextField
                                        label="Tag"
                                        name="tag"
                                        maxLength={32}
                                        showCharacterCount
                                        disabled={updateInputDisabled}
                                        value={tagInput}
                                        onChange={setTagInput}
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
                                        // error={errors?.tags}
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
