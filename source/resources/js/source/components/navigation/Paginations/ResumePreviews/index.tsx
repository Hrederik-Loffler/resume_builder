// @NOTE: Import library functions.
import { Fragment, useCallback } from "react";
import { Layout, EmptyState } from "@shopify/polaris";
import PreviewItem from "@components/structure/PreviewItem";

// @NOTE: Import custom functions.
import ResumePreviewsVariants from "@components/navigation/Paginations/ResumePreviews/Variants";
import NotFound from "@components/feedback/NotFound";

// @NOTE: Import misc.
import Resume from "@js/types/Resume";
import routes from "@constants/routes";
import preview from "@constants/preview";
import { IPaginatedResponse, IReducerState } from "@actions/action";

/**
 * IResumePreviewsProps - props for `ResumePreviews` component.
 */
export interface IResumePreviewsProps {
    resumes: IReducerState<IPaginatedResponse<Resume[]>>;
}

/**
 * ResumePreviews - lists paginated resumes.
 *
 * @returns JSX.Element
 */
export default function ResumePreviews({ resumes }: IResumePreviewsProps) {
    // @NOTE: Closures.
    const renderResumes = useCallback(() => {
        return resumes.data?.data.data.map((resume: Resume, key: number) => {
            return (
                <Layout.Section oneThird key={key}>
                    <PreviewItem
                        title={resume.title}
                        description={resume.description}
                        img={resume.image || preview.resume}
                        url={`${routes.resumesDetails.base}/${resume.id}`}
                    />
                </Layout.Section>
            );
        });
    }, [resumes]);

    if (resumes.loading) {
        return <ResumePreviewsVariants />;
    }

    // @NOTE: If there are no resumes found, display not found error.
    if (!resumes.data?.data.data.length) {
        return <NotFound />;
    }

    return <Layout>{renderResumes()}</Layout>;
}
