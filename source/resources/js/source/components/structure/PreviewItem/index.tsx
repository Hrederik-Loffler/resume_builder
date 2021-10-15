// @NOTE: Import library functions.
import { MediaCard } from "@shopify/polaris";
import { useCallback } from "react";
import { useHistory } from "react-router";

/**
 * IPreviewItemProps - props for `PreviewItem` component.
 */
export interface IPreviewItemProps {
    title: string;
    description: string;
    img: string;
    url: string;
}

/**
 * PreviewItem - media card that gives an overview of resume item.
 *
 * @prop {IPreviewItemProps} props
 *
 * @returns JSX.Element
 */
export default function PreviewItem({
    title,
    description,
    img,
    url,
}: IPreviewItemProps) {
    // @NOTE: Misc hooks.
    const history = useHistory();

    // @NOTE: Closures.
    const handleItemClick = useCallback(() => {
        history.push(url);
    }, []);

    // @NOTE: Render component.
    return (
        <MediaCard
            title={title}
            description={description}
            portrait
            primaryAction={{ content: "Try this", onAction: handleItemClick }}
        >
            <img
                alt={title}
                width="100%"
                height="200px"
                style={{
                    objectFit: "cover",
                    objectPosition: "center",
                }}
                src={img}
            />
        </MediaCard>
    );
}
