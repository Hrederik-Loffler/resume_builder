// @NOTE: Import from libraries.
import { EmptyState } from "@shopify/polaris";

/**
 * NotFound - display not found error.
 *
 * @return {JSX.Element}
 */
export default function NotFound() {
    return (
        <EmptyState
            heading="404 not found"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl9DN9irguvWfsYs5L3jiXISDvycmclpp1HQ&usqp=CAU"
        />
    );
}
