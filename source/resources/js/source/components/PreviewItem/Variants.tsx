// @NOTE: Import library functions.
import { Card, MediaCard, SkeletonBodyText, SkeletonThumbnail } from '@shopify/polaris';
import { useCallback } from 'react';

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

/**
 * PreviewItemVariants - component that's shown for PreviewItem while data is loading.
 *
 * @returns JSX.Element
 */
export default function PreviewItemVariants() {
    // @NOTE: Closures.
    const renderTitleSkeleton = useCallback(() => {
        return <SkeletonBodyText lines={4} />;
    }, []);

    // @NOTE: Render component.
    return (
        <MediaCard description="" title={renderTitleSkeleton()} portrait>
            <img
                width="100%"
                height="100%"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                src="/images/previews/resume-preview-image.jpeg"
            />
        </MediaCard>
    );
}
