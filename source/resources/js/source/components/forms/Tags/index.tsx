// @NOTE: Import from libraries.
import { Stack, Tag as PolarisTag } from "@shopify/polaris";

// @NOTE: Import from own files.
import Tag from "@js/types/Tag";
import TagsVariants from "./Variants";

/**
 * ITagsProps - props for `Tags` component.
 */
export interface ITagsProps {
    tags: Tag[];
    onRemove: (key: number) => void;
    loading?: boolean;
    disabled?: boolean;
}

/**
 * Tags - Lists all available tags and removes when needed.
 *
 * @param {ITagsProps} props
 *
 * @return {JSX.Element}
 */
export default function Tags({
    tags,
    onRemove,
    loading,
    disabled = false,
}: ITagsProps) {
    if (loading) {
        return <TagsVariants />;
    }

    return (
        <Stack spacing="tight">
            {tags.map((tag, key) => {
                return (
                    <PolarisTag
                        disabled={disabled}
                        key={key}
                        onRemove={() => onRemove(key)}
                    >
                        {tag.name}
                    </PolarisTag>
                );
            })}
        </Stack>
    );
}
