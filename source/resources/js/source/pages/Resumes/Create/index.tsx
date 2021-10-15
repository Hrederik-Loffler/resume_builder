// @NOTE: Import from libraries.
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    Form,
    FormLayout,
    Layout,
    Page,
    TextField as PolarisTextField,
} from "@shopify/polaris";
import {
    FormProvider,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";

// @NOTE: Import from own files.
import { createResume, IResumeDetailsData } from "@actions/resumes/single";
import createResumeResolver from "@pages/Resumes/Create/rules";
import ToastService from "@services/ToastService";
import ControllerTextField from "@components/forms/TextField";
import Tags from "@components/forms/Tags";
import { IRootStore } from "@store/index";
import { useHistory } from "react-router";
import routes from "@constants/routes";

export default function ResumeCreate() {
    // @NOTE: State hooks.
    const [tagInput, setTagInput] = useState("");

    // @NOTE: Form hooks.
    const methods = useForm<IResumeDetailsData>({
        resolver: yupResolver(createResumeResolver),
        mode: "onTouched",
    });
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors, isSubmitting, isValid, dirtyFields },
    } = methods;
    const tags = useFieldArray<IResumeDetailsData, "tags", "tagId">({
        control,
        name: "tags",
        keyName: "tagId",
    });

    // @NOTE: Misc. hooks.
    const resume = useSelector((state: IRootStore) => state.resume);
    const dispatch = useDispatch();
    const history = useHistory();

    // @NOTE: Save changes function.
    const saveChanges: SubmitHandler<IResumeDetailsData> = useCallback(
        async (data: IResumeDetailsData) => {
            const res = await dispatch(createResume(data));
            ToastService.success(res.payload.data?.message);
            const id = res.payload.data?.data.id;
            history.push(`${routes.resumesDetails.base}/${id}`);
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

    // @NOTE: Should update button and input be disabled.
    const updateButtonDisabled =
        isSubmitting ||
        !isValid ||
        _.isEmpty(dirtyFields) ||
        resume.updating ||
        resume.loading;
    const addTagButtonDisabled =
        !!getValues("tags")?.find((tag) => tag.name === tagInput) ||
        isSubmitting ||
        !tagInput ||
        resume.updating ||
        resume.loading;
    const removeTagButtonDisabled = resume.updating;
    const updateInputDisabled = resume.updating || resume.loading;
    const tagsLoading = resume.loading;

    return (
        <Page
            title="Create resume"
            primaryAction={{
                content: "Create template",
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
                                        value={tagInput}
                                        disabled={updateInputDisabled}
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
                    </Layout>
                </Form>
            </FormProvider>
        </Page>
    );
}
