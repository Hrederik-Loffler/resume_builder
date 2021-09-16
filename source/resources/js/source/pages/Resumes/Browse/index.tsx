// @NOTE: Import library functions.
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, MediaCard, Page, ResourceList } from '@shopify/polaris';

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

    // @NOTE: Render component.
    return (
        <Page title="All templates" divider>
            <ResumePreviews resumes={resumes} />
        </Page>
    );
}
