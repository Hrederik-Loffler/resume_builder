// @NOTE: Import from libraries.
import { Redirect, Route, RouteProps } from "react-router";

// @NOTE: Import from own files.
import useAuth from "@js/hooks/useAuth";
import routes from "@constants/routes";

/**
 * PrivateRoute - protects routes from unauthorized users. If user
 * is not authorized, then this user will be redirected to the
 * sign in page.
 *
 * @param {RouteProps} props
 *
 * @return {JSX.Element}
 */
export default function PrivateRoute(props: RouteProps) {
    const user = useAuth();

    if (!user) {
        return <Redirect to={routes.authSignIn.url} />;
    }

    return <Route {...props}></Route>;
}
