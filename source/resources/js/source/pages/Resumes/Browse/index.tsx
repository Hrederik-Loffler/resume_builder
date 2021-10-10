// @NOTE: Import library functions.
import { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Icon,
    Layout,
    MediaCard,
    Page,
    Pagination,
    Stack,
    Tag,
    TextField,
} from "@shopify/polaris";
import queryString from "query-string";

// @NOTE: Import custom functions.
import ResumePreviews from "@components/Paginations/ResumePreviews";

// @NOTE: Import misc.
import loadResumes from "@actions/resumes/list";
import { IRootStore } from "@js/store";
import routes from "@constants/routes";

/**
 * ResumesBrowse - lists available resume templates.
 *
 * @returns JSX.Element
 */
export default function ResumesBrowse() {
    // @NOTE: Router hooks.
    const location = useLocation();

    // @NOTE: State hooks.
    const [filters, setFilters] = useState(() => {
        const params = queryString.parse(location.search);

        return {
            page: parseInt(params["page"] as string) || 1,
        };
    });

    // @NOTE: Misc hooks.
    const history = useHistory();
    const dispatch = useDispatch();
    const resumes = useSelector((state: IRootStore) => state.resumes);

    // @NOTE: Load resumes.
    useEffect(() => {
        console.log(123);

        dispatch(loadResumes(location.search));
    }, [filters]);

    // @NOTE: Call this function, instead of `setFilters` when you need to update filters.
    // This will redirect user to new page, saving previous - in history.
    const updateFilters = useCallback((filters) => {
        history.push(
            `${routes.resumesBrowse.base}?${queryString.stringify(filters)}`
        );
        setFilters(filters);
    }, []);

    // @NOTE: Render component.
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

                <Layout.Section>
                    <div className="pagination-wrapper">
                        <Pagination
                            hasPrevious={!!resumes.data.data.prev_page_url}
                            onPrevious={() => {
                                updateFilters({
                                    ...filters,
                                    page: filters.page - 1,
                                });
                            }}
                            hasNext={!!resumes.data.data.next_page_url}
                            onNext={() => {
                                updateFilters({
                                    ...filters,
                                    page: filters.page + 1,
                                });
                            }}
                        />
                    </div>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
