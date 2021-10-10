// @NOTE: Import from libraries.
import { useCallback } from "react";
import {
    Button,
    Card,
    FormLayout,
    Layout,
    Page,
    Stack,
    Tag,
    TextField,
} from "@shopify/polaris";
import { Link, useParams } from "react-router-dom";

// @NOTE: Import from own files.
import routes from "@constants/routes";

export interface IPageParams {
    id: string;
}

/**
 * ResumesDetails - page where admin can change details about a resume.
 *
 * @return {JSX.Element}
 */
export default function ResumesDetails() {
    // @NOTE: Router hooks.
    let { id } = useParams<IPageParams>();

    // @NOTE: Misc. hooks.
    const handlePageOnAction = useCallback(() => {}, []);
    const handleTagOnRemove = useCallback(() => {}, []);

    return (
        <Page
            title="Resume details"
            primaryAction={{
                content: "Update template",
                onAction: handlePageOnAction,
            }}
            divider
        >
            <Layout>
                <Layout.AnnotatedSection
                    title="Resume basic information"
                    description="Give us essential information about resume template."
                >
                    <Card sectioned>
                        <FormLayout>
                            <TextField label="Title" onChange={() => {}} />
                            <TextField
                                label="Description"
                                onChange={() => {}}
                            />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection
                    title="Resume tags"
                    description="Users search templates by hashtags. You are advised to add a few hashtags so that users can find this template."
                >
                    <Card sectioned>
                        <FormLayout>
                            <TextField
                                label="Tag"
                                onChange={() => {}}
                                autoComplete="off"
                                connectedRight={<Button>Add</Button>}
                            />
                            <Stack spacing="tight">
                                <Tag onRemove={handleTagOnRemove}>Tag1</Tag>
                                <Tag onRemove={handleTagOnRemove}>Tag2</Tag>
                                <Tag onRemove={handleTagOnRemove}>Tag3</Tag>
                            </Stack>
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection
                    title="Template"
                    description={
                        <p>
                            Templates can be edited in resume editor. Click the
                            right button to open new window where you can edit
                            this template. Visit{" "}
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
        </Page>
    );
}
