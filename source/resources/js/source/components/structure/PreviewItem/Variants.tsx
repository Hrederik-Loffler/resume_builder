// @NOTE: Import library functions.
import { MediaCard, SkeletonBodyText } from "@shopify/polaris";
import { useCallback } from "react";

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
            <div
                style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "200px",
                }}
            ></div>
        </MediaCard>
    );
}
