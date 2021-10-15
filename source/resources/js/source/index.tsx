// @NOTE: Import library functions.
import { AppProvider } from "@shopify/polaris";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

// @NOTE: Import custom functions.
import Router from "@router/Router";
import RouterLink from "@components/navigation/Links/RouterLink";

// @NOTE: Import misc.
import store from "@store/index";
import defaultTheme from "@theme/default";

/**
 * App - Create App component that will create project's theme, redux
 * and other providers.
 *
 * @returns {JSX.Element}
 */
export default function App() {
    return (
        <Provider store={store}>
            <AppProvider
                i18n={{}}
                linkComponent={RouterLink}
                theme={defaultTheme}
            >
                <Toaster position="top-center" />
                <Router />
            </AppProvider>
        </Provider>
    );
}
