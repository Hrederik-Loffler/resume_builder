// @NOTE: Import library functions.
import { IconSource } from '@shopify/polaris';
import { HomeMajor, SearchMajor, PlusMinor } from '@shopify/polaris-icons';

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

/**
 * IRouteItem - Define a route in the application. It's being used
 * in Router component to define available routes as well
 * as in navigational bar.
 */
export interface IRouteItem {
    url: string;
    label: string;
    icon: IconSource;
}

/**
 * routes - Variable that holds all routes in the application.
 */
const routes = {
    home: { url: '/', label: 'Home', icon: HomeMajor } as IRouteItem,
    resumesBrowse: { url: '/browse', label: 'Browse', icon: SearchMajor } as IRouteItem,
    resumesCreate: { url: '/create', label: 'Create', icon: PlusMinor } as IRouteItem,
};

/**
 * mainRoutes - Variable that holds all routes that are supposed to be used
 * in main section of navigational bar.
 */
export const mainRoutes = [routes.home, routes.resumesBrowse];

export default routes;
