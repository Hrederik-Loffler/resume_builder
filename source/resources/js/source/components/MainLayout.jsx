import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Link as ReactRouterLink } from 'react-router-dom';
import {AppProvider, EmptyState, Frame, Page} from "@shopify/polaris";
import {NOT_FOUND_IMAGE, SITE_NAME, SITE_URL} from "../environments/environment";
import HomePage from "./Pages/HomePage/HomePage";
import Sidebar from "./Sidebar/Sidebar";
import { useTranslate } from '../hooks/useTranslate'
import Settings from "./Pages/Settings";

function Link({children, url = '', ...rest}) {
    if (isOutboundLink(url) || rest.download) {
        return (
            <a href={url} {...rest}>
                {children}
            </a>
        );
    }
    return (
        <ReactRouterLink to={url} {...rest}>
            {children}
        </ReactRouterLink>
    );
}

function isOutboundLink(url) {
    return /^(?:[a-z][a-z\d+.-]*:|\/\/)/.test(url);
}

const theme = {
    logo: {
        width: 100,
        topBarSource: '/images/devit-logo-horizontal.svg',
        url: SITE_URL,
        accessibilityLabel: SITE_NAME,
    },
};

function MainLayout (props) {

    const i18n = useTranslate();

    return (
        <AppProvider theme={theme} i18n={i18n.translations} linkComponent={ Link } >
            <Router>
                <Frame navigation={<Sidebar {...props}  i18n={i18n}/> } >
                    <Switch>
                        <Route exact path={'/'} render={(props) => <HomePage {...props} />} />
                        <Route exact path={'/settings'} render={props => <Settings {...props} />} />
                        <Route>
                            404
                        </Route>
                    </Switch>
                </Frame>
            </Router>
        </AppProvider>
    )
}
export default MainLayout;
