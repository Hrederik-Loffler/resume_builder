// @NOTE: Import library functions.
import { Router, Switch, Route } from "react-router-dom";
import { Fragment } from "react";
import { EmptyState } from "@shopify/polaris";

// @NOTE: Import custom functions.
import ResumesEditor from "@pages/Resumes/Editor";
import SiteLayout from "@components/layouts/SiteLayout";
import Home from "@pages/Home";
import ResumesBrowse from "@pages/Resumes/Browse";
import ResumesCreate from "@pages/Resumes/Create";
import ResumesDetails from "@pages/Resumes/Details";
import NotFound from "@components/feedback/NotFound";

// @NOTE: Import misc.
import routes from "@constants/routes";
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
                            <Route
                                path={routes.home.url}
                                exact
                                component={Home}
                            />
                            <Route
                                path={routes.resumesCreate.url}
                                exact
                                component={ResumesCreate}
                            />
                            <Route
                                path={routes.resumesBrowse.url}
                                exact
                                component={ResumesBrowse}
                            />
                            <Route
                                path={routes.resumesDetails.url}
                                exact
                                component={ResumesDetails}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Fragment>
                </SiteLayout>
            </Switch>
        </Router>
    );
}
