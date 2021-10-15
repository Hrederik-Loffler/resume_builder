// @NOTE: Import library functions.
import { useCallback, useState } from "react";
import { Frame, TopBar as PolarisTopBar } from "@shopify/polaris";

// @NOTE: Import custom functions.
import Navigation from "@components/layouts/Navigation";
import TopBarUser from "@components/layouts/TopBarUser";

/**
 * ISiteLayoutProps - props for `SiteLayout` component.
 */
export interface ISiteLayoutProps {
    children?: JSX.Element;
}

/**
 * SiteLayout - Lays down navigational bar and contanet for the application. It
 * uses polaris' Frame component.
 *
 * @prop {JSX.Element} children - Frame's children, usually Router component.
 * @returns JSX.Element
 */
export default function SiteLayout({ children }: ISiteLayoutProps) {
    // @NOTE: State hooks.
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // @NOTE: Closures.
    /**
     * Handles navigation menu toggle.
     */
    const handleNavigationToggle = useCallback(() => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen);
    }, []);

    /**
     * Toggles user menu.
     */
    const toggleIsUserMenuOpen = useCallback(() => {
        setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
    }, []);

    return (
        <Frame
            topBar={
                <PolarisTopBar
                    userMenu={
                        <TopBarUser
                            isUserMenuOpen={isUserMenuOpen}
                            toggleIsUserMenuOpen={toggleIsUserMenuOpen}
                        />
                    }
                    showNavigationToggle
                    onNavigationToggle={handleNavigationToggle}
                />
            }
            navigation={<Navigation />}
            showMobileNavigation={isMenuOpen}
            onNavigationDismiss={handleNavigationToggle}
        >
            {children}
        </Frame>
    );
}
