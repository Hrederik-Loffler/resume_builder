// @NOTE: Import library functions.
import { useCallback } from "react";
import { Navigation as PolarisNavigation } from "@shopify/polaris";
import { useLocation } from "react-router-dom";

// @NOTE: Import misc.
import { mainRoutes, IRouteItem, adminRoutes } from "@constants/routes";

interface IMenuItem extends IRouteItem {
    selected: boolean;
}
/**
 * Navigation - Defines navigational component for mobile devices.
 *
 * @returns JSX.Element
 */
export default function Navigation() {
    // @NOTE: Misc hooks.
    const location = useLocation();

    /**
     * Updates selected link in navigational bar. Since Polaris
     * cannot handle these by default, this function is used
     * to do just that. It takes all available routes and
     * adds new property, 'selected', which just compares
     * current route with intended.
     *
     * @returns {IMenuItem[]}
     */
    const toggleIsUserMenuOpen = useCallback(
        (routes: IRouteItem[]) => {
            return routes.map((item) => {
                return {
                    ...item,
                    selected: location.pathname === item.url,
                } as IMenuItem;
            });
        },
        [location]
    );

    // @NOTE: Render component.
    return (
        <PolarisNavigation location={location.pathname}>
            <PolarisNavigation.Section
                title="Resume generator app"
                items={toggleIsUserMenuOpen(mainRoutes)}
            />
            <PolarisNavigation.Section
                items={toggleIsUserMenuOpen(adminRoutes)}
            />
        </PolarisNavigation>
    );
}
