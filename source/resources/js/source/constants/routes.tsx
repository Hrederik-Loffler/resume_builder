// @NOTE: Import library functions.
import { IconSource } from "@shopify/polaris";
import {
    HomeMajor,
    SearchMajor,
    PlusMinor,
    TemplateMajor,
    InfoMinor,
} from "@shopify/polaris-icons";

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
    base?: string;
    label: string;
    icon: IconSource;
}

/**
 * routes - Variable that holds all routes in the application.
 */
const routes = {
    home: { url: "/", label: "Home", icon: HomeMajor },
    resumesBrowse: {
        url: "/browse",
        label: "Browse",
        icon: SearchMajor,
    },
    resumesCreate: {
        url: "/create",
        label: "Create",
        icon: PlusMinor,
    },
    resumesEditor: {
        url: "/resumes/editor/:id",
        base: "/resumes/editor",
        label: "Editor",
        icon: TemplateMajor,
    },
    resumesDetails: {
        url: "/resumes/details/:id",
        label: "Details",
        icon: InfoMinor,
    },
};

/**
 * mainRoutes - Variable that holds all routes that are supposed to be used
 * in main section of navigational bar.
 */
export const mainRoutes = [routes.home, routes.resumesBrowse];

export default routes;
