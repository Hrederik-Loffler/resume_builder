// @NOTE: Import from libraries.
import preview from "@constants/preview";

// @NOTE: Import from own files.
import { EmptyState } from "@shopify/polaris";

/**
 * NotFound - display not found error.
 *
 * @return {JSX.Element}
 */
export default function NotFound() {
    return <EmptyState heading="404 not found" image={preview.notFound} />;
}
