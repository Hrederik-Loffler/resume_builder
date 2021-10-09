// @NOTE: Import from libraries.
import { Spinner } from "@shopify/polaris";
import { Fragment } from "react";

// @NOTE: Import from own files.

export interface IScreenLoadingProps {
    children: JSX.Element;
    loading: boolean;
}

/**
 * Display loading screen while page is loading.
 *
 * @param {IScreenLoadingProps} props
 *
 * @return {JSX.Element}
 */
export default function ScreenLoading({
    children,
    loading = true,
}: IScreenLoadingProps) {
    return (
        <Fragment>
            {loading && (
                <div className="screen-loading">
                    <Spinner
                        accessibilityLabel="Spinner example"
                        size="large"
                    />
                </div>
            )}
            {children}
        </Fragment>
    );
}
