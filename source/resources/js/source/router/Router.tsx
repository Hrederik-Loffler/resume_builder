// @NOTE: Import library functions.
import { Router, Switch, Route } from "react-router-dom";
import { Fragment } from "react";

// @NOTE: Import custom functions.
import ResumesEditor from "@pages/Resumes/Editor";
import SiteLayout from "@components/layouts/SiteLayout";
import NotFound from "@components/feedback/NotFound";

// @NOTE: Import misc.
import routes, { publicRoutes } from "@constants/routes";
import history from "@router/history";

/**
 * Router - defines all routes that are available on the website.
 *
 * @return {JSX.Element}
 */
export default function AppRouter() {
    return (
        <Router history={history}>
            <Switch>
                <Route
                    path={routes.resumesEditor.url}
                    exact
                    component={ResumesEditor}
                />

                {/* @NOTE: Pages with navbar */}
                <SiteLayout>
                    <Fragment>
                        <Switch>
                            {publicRoutes.map((route, key) => (
                                <Route
                                    key={key}
                                    path={route.url}
                                    exact
                                    component={route.component}
                                />
                            ))}
                            <Route component={NotFound} />
                        </Switch>
                    </Fragment>
                </SiteLayout>
            </Switch>
        </Router>
    );
}
