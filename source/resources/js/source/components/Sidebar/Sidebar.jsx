import React from "react";
import { Navigation } from "@shopify/polaris";
import { useLocation, useHistory } from "react-router-dom";
import {
    HomeMajor,
    SettingsMajor,
} from '@shopify/polaris-icons'
import style from './styles.module.scss';

const Sidebar = (props) => {
    const {i18n} = props;
    const location = useLocation();
    const history = useHistory();

    return (
        <div id="side_navigation" className={style.root}>
            <Navigation location={history.location.pathname} >
                <Navigation.Section
                    items={[
                        {
                            exactMatch: true,
                            url: '/',
                            icon: HomeMajor,
                            label: i18n.translate('Sidebar.Dashboard.MenuTitle'),
                        },
                    ]}
                />
                <Navigation.Section
                    fill={true}
                    separator
                    items={[
                        {
                            url: '/settings',
                            label: i18n.translate('Sidebar.Settings.MenuTitle'),
                            icon: SettingsMajor,
                        },
                    ]}
                />
            </Navigation>
        </div>
    )
}
export default Sidebar;
