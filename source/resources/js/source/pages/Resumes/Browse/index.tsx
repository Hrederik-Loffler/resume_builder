// @NOTE: Import library functions.
import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Icon,
    Layout,
    MediaCard,
    Page,
    Stack,
    Tag,
    TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

// @NOTE: Import custom functions.
import ResumePreviews from "@components/Paginations/ResumePreviews";

// @NOTE: Import misc.
import loadResumes from "@actions/resumes/list";
import { IRootStore } from "@js/store";

/**
 * ResumesBrowse - lists available resume templates.
 *
 * @returns JSX.Element
 */
export default function ResumesBrowse() {
    // @NOTE: Misc hooks.
    const dispatch = useDispatch();
    const resumes = useSelector((state: IRootStore) => state.resumes);

    useEffect(() => {
        dispatch(loadResumes());
    }, []);

    return (
        <Page title="Browse templates" divider>
            <Layout>
                <Layout.Section>
                    <TextField
                        label="Tags"
                        onChange={() => {}}
                        autoComplete="off"
                        connectedRight={
                            <Button onClick={() => {}} loading={false}>
                                Search
                            </Button>
                        }
                    />
                </Layout.Section>

                <Layout.Section>
                    <Stack>
                        <Tag onRemove={() => {}}>Tag1</Tag>
                        <Tag onRemove={() => {}}>Tag2</Tag>
                        <Tag onRemove={() => {}}>Tag3</Tag>
                    </Stack>
                </Layout.Section>

                <Layout.Section>
                    <ResumePreviews resumes={resumes} />
                </Layout.Section>
            </Layout>
        </Page>
    );
}
