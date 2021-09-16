// @NOTE: Import library functions.
import { useCallback } from 'react';
import { Layout } from '@shopify/polaris';

// @NOTE: Import custom functions.
// import PreviewItem from '@components/Images/PreviewItem';
// import PreviewItemVariants from '@components/Images/PreviewItem/Variants';

// @NOTE: Import misc.

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
                'asd'
                // <Layout.Section oneThird key={key}>
                //     <PreviewItemVariants />
                // </Layout.Section>
            );
        });
    }, []);

    // @NOTE: Render component.
    return <Layout>{renderPreviewItems(9)}</Layout>;
}
