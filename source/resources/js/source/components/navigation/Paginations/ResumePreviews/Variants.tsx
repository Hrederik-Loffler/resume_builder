// @NOTE: Import library functions.
import { useCallback } from "react";
import { Layout } from "@shopify/polaris";

// @NOTE: Import custom functions.
import PreviewItemVariants from "@components/structure/PreviewItem/Variants";

/**
 * ResumePreviewsVariants - component that's shown for ResumePreviews while data is loading.
 *
 * @returns JSX.Element
 */
export default function ResumePreviewsVariants() {
    // @NOTE: Closures.
    const renderPreviewItems = useCallback((items: number) => {
        return Array.from(Array(items).keys()).map((n: number, key: number) => {
            return (
                <Layout.Section oneThird key={key}>
                    <PreviewItemVariants />
                </Layout.Section>
            );
        });
    }, []);

    // @NOTE: Render component.
    return <Layout>{renderPreviewItems(9)}</Layout>;
}
