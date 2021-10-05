// @NOTE: Import library functions.
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Fragment } from "react";
import { EmptyState } from "@shopify/polaris";

// @NOTE: Import custom functions.
import ResumesEditor from "@pages/Resumes/Editor";
import SiteLayout from "@components/layouts/SiteLayout";
import Home from "@pages/Home";
import ResumesBrowse from "@pages/Resumes/Browse";
import ResumesCreate from "@pages/Resumes/Create";

// @NOTE: Import misc.
import routes from "@constants/routes";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path={routes.resumesEditor.url}
                    exact
                    component={ResumesEditor}
                />

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
                            <Route>
                                <EmptyState
                                    heading="404 not found"
                                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl9DN9irguvWfsYs5L3jiXISDvycmclpp1HQ&usqp=CAU"
                                />
                            </Route>
                        </Switch>
                    </Fragment>
                </SiteLayout>
            </Switch>
        </BrowserRouter>
    );
}
