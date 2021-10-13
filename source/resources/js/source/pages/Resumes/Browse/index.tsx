// @NOTE: Import library functions.
import { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Form,
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
import FiltersService from "@services/FiltersService";
import ResumePreviews from "@components/navigation/Paginations/ResumePreviews";

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
        return FiltersService.browsePageFilters(
            queryString.parse(location.search, {
                arrayFormat: "bracket",
            })
        );
    });
    const [search, setSearch] = useState("");

    // @NOTE: Misc hooks.
    const history = useHistory();
    const dispatch = useDispatch();
    const resumes = useSelector((state: IRootStore) => state.resumes);

    // @NOTE: Listen page changes.
    useEffect(() => {
        return history.listen((loc) => {
            setFilters(
                FiltersService.browsePageFilters(
                    queryString.parse(loc.search, {
                        arrayFormat: "bracket",
                    })
                )
            );
        });
    }, []);

    // @NOTE: Load resumes.
    useEffect(() => {
        dispatch(loadResumes(filters));
    }, [filters]);

    // @NOTE: Call this function, instead of `setFilters` when you need to update filters.
    // This will redirect user to new page, saving previous - in history.
    const updateFilters = useCallback((filters) => {
        history.push(
            `${routes.resumesBrowse.base}?${queryString.stringify(filters, {
                arrayFormat: "bracket",
            })}`
        );
        setFilters(filters);
    }, []);

    // @NOTE: Determine if search button should be disabled.
    const searchButtonDisabled = () => {
        return !search;
    };

    // @NOTE: Render component.
    return (
        <Page title="Browse templates" divider>
            <Layout>
                <Layout.Section>
                    <Form
                        onSubmit={() => {
                            setSearch("");
                            updateFilters({
                                ...filters,
                                page: 1,
                                tags: [...filters.tags, search],
                            });
                        }}
                    >
                        <TextField
                            label="Tags"
                            type="search"
                            onChange={setSearch}
                            value={search}
                            autoComplete="off"
                            connectedRight={
                                <Button
                                    submit
                                    primary
                                    loading={false}
                                    disabled={searchButtonDisabled()}
                                >
                                    Search
                                </Button>
                            }
                        />
                    </Form>
                </Layout.Section>

                <Layout.Section>
                    <Stack>
                        {filters.tags.map((filter, key) => (
                            <Tag
                                key={key}
                                onRemove={() =>
                                    updateFilters({
                                        ...filters,
                                        page: 1,
                                        tags: filters.tags.filter(
                                            (tag) => tag !== filter
                                        ),
                                    })
                                }
                            >
                                {filter}
                            </Tag>
                        ))}
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
