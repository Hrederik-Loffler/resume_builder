import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from '@app/store';
import "@shopify/polaris/dist/styles.css"
import {I18nContext, I18nManager} from '@shopify/react-i18n';
import './index.scss';
import MainLayout from "./components/MainLayout";



const i18nManager = new I18nManager({locale: 'ru'});

function App(props) {
    return (
        <I18nContext.Provider value={i18nManager} >
            <Provider store={store}>
                <MainLayout {...props}/>
            </Provider>
        </I18nContext.Provider>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
