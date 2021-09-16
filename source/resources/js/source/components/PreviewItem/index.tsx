// @NOTE: Import library functions.
import { MediaCard } from '@shopify/polaris';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

export interface IPreviewItemProps {
    title: string;
    description: string;
    img: string;
    url: string;
}

/**
 * PreviewItem - media card that gives an overview of resume item.
 *
 * @prop {string} title - preview item title
 * @prop {string} description - preview item description
 * @prop {string} img - preview item image url
 * @prop {string} url - preview item destination url
 *
 * @returns JSX.Element
 */
export default function PreviewItem({ title, description, img, url }: IPreviewItemProps) {
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
            primaryAction={{ content: 'Try this', onAction: handleItemClick }}
        >
            <img
                alt={title}
                width="100%"
                height="100%"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                src={img}
            />
        </MediaCard>
    );
}
