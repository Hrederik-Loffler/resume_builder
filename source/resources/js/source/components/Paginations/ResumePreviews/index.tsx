// @NOTE: Import library functions.
import { Fragment, useCallback } from "react";
import { Layout } from "@shopify/polaris";
import PreviewItem from "@components/PreviewItem";

// @NOTE: Import custom functions.
import ResumePreviewsVariants from "@components/Paginations/ResumePreviews/Variants";

// @NOTE: Import misc.
import { IResumesReducerState } from "@reducers/resumes";
import Resume from "@js/types/Resume";
import routes from "@constants/routes";

export interface IResumePreviewsProps {
    resumes: IResumesReducerState;
}

/**
 * ResumePreviews - lists paginated resumes.
 *
 * @returns JSX.Element
 */
export default function ResumePreviews({ resumes }: IResumePreviewsProps) {
    // @NOTE: Closures.
    const renderResumes = useCallback(() => {
        return resumes.data.data.data.map((resume: Resume, key: number) => {
            return (
                <Layout.Section oneThird key={key}>
                    <PreviewItem
                        title={resume.title}
                        description={resume.description}
                        img={resume.image}
                        url={`${routes.resumesDetails.base}/${resume.id}`}
                    />
                </Layout.Section>
            );
        });
    }, [resumes]);

    // @NOTE: Render component.
    if (resumes.loading) {
        return <ResumePreviewsVariants />;
    }

    return (
        <div className="force-oneThird">
            <Layout>{renderResumes()}</Layout>
        </div>
    );
}
