// @NOTE: Import library functions.
import { BrowserRouter, Switch, Route } from 'react-router-dom';


// @NOTE: Import custom functions.
import Home from "@pages/Home";
import SiteLayout from "@components/layouts/SiteLayout";

// @NOTE: Import misc.
import routes from "@constants/routes";

export default function Router() {

    return (
        <BrowserRouter>
            <SiteLayout>
                <Switch>
                    <Route path={routes.home.url} exact component={Home} />
                </Switch>
            </SiteLayout>
        </BrowserRouter>
    )
}
