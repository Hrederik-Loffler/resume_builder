// @NOTE: Import library functions.
import { IconSource } from "@shopify/polaris";
import {
    HomeMajor,
    SearchMajor,
    PlusMinor,
    TemplateMajor,
    InfoMinor,
    CustomersMajor,
    ProfileMajor,
} from "@shopify/polaris-icons";

// @NOTE: Import from own files.
import Home from "@pages/Home";
import ResumesBrowse from "@pages/Resumes/Browse";
import ResumesCreate from "@pages/Resumes/Create";
import ResumesEditor from "@pages/Resumes/Editor";
import ResumesDetails from "@pages/Resumes/Details";
import SignIn from "@pages/Auth/SignIn";
import SignUp from "@pages/Auth/SignUp";
import Profile from "@pages/Profile";

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
    component: () => JSX.Element;
}

/**
 * routes - Variable that holds all routes in the application.
 */
const routes = {
    home: { url: "/", label: "Home", icon: HomeMajor, component: Home },
    profile: {
        url: "/profile",
        label: "Profile",
        icon: ProfileMajor,
        component: Profile,
    },
    resumesBrowse: {
        url: "/resumes/browse",
        base: "/resumes/browse",
        label: "Browse",
        icon: SearchMajor,
        component: ResumesBrowse,
    },
    resumesCreate: {
        url: "/resumes/create",
        base: "/resumes/create",
        label: "Create",
        icon: PlusMinor,
        component: ResumesCreate,
    },
    resumesEditor: {
        url: "/resumes/editor/:id",
        base: "/resumes/editor",
        label: "Editor",
        icon: TemplateMajor,
        component: ResumesEditor,
    },
    resumesDetails: {
        url: "/resumes/details/:id",
        base: "/resumes/details",
        label: "Details",
        icon: InfoMinor,
        component: ResumesDetails,
    },
    authSignIn: {
        url: "/auth/sign-in",
        base: "/auth/sign-in",
        label: "Sign in",
        icon: CustomersMajor,
        component: SignIn,
    },
    authSignUp: {
        url: "/auth/sign-up",
        base: "/auth/sign-up",
        label: "Sign up",
        icon: CustomersMajor,
        component: SignUp,
    },
};

/**
 * mainRoutes - Variable that holds all routes that are supposed to be used
 * in main section of navigational bar.
 */
export const mainRoutes = [routes.home, routes.resumesBrowse];

/**
 * publicRoutes - Variable that holds all routes that are available to any user.
 */
export const publicRoutes = [
    routes.home,
    routes.resumesBrowse,
    routes.resumesEditor,
    routes.resumesDetails,
    routes.authSignIn,
    routes.authSignUp,
];

/**
 * privateRoutes - Variable that holds all routes that are available to authenticated users.
 */
export const privateRoutes = [routes.profile];

/**
 * adminRoutes - Variable that holds all routes that are supposed to be used
 * by admin in main section of navigational bar.
 */
export const adminRoutes = [routes.resumesCreate];

export default routes;
