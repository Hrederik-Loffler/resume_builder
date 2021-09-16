// @NOTE: Import library functions.
import { BrowserRouter, Switch, Route } from 'react-router-dom';


// @NOTE: Import custom functions.
import Home from "@pages/Home";
import SiteLayout from "@components/layouts/SiteLayout";
import ResumesCreate from "@pages/Resumes/Create";
import ResumesBrowse from "@pages/Resumes/Browse";
import {EmptyState} from "@shopify/polaris";

// @NOTE: Import misc.
import routes from "@constants/routes";

export default function Router() {

    return (
        <BrowserRouter>
            <SiteLayout>
                <Switch>
                    <Route path={routes.home.url} exact component={Home} />
                    <Route path={routes.resumesCreate.url} exact component={ResumesCreate}/>
                    <Route path={routes.resumesBrowse.url} exact component={ResumesBrowse} />
                    <Route>
                        <EmptyState
                            heading="404 not found"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl9DN9irguvWfsYs5L3jiXISDvycmclpp1HQ&usqp=CAU"
                        />
                    </Route>
                </Switch>
            </SiteLayout>
        </BrowserRouter>
    )
}
