// @NOTE: Import library functions.
import { AppProvider } from '@shopify/polaris';
import { Provider } from 'react-redux';


// @NOTE: Import custom functions.
import Router from "@router/Router";

// @NOTE: Import misc.
import store from '@store/index';



/**
 * App - Create App component that will create project's theme, redux
 * and other providers.
 *
 * @returns {JSX.Element}
 */
export default function App() {

    return (
        <Provider store={store}>
            <AppProvider i18n={{}}>
                <Router />
            </AppProvider>
        </Provider>
    )
}
