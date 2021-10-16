// @NOTE: Import library functions.
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TopBar as PolarisTopBar } from "@shopify/polaris";
import { useHistory } from "react-router";
import { LogOutMinor } from "@shopify/polaris-icons";

// @NOTE: Import from own files.
import routes from "@constants/routes";
import { ITopBarUserProps } from "@components/layouts/TopBarUser";
import useAuth from "@js/hooks/useAuth";
import ToastService from "@services/ToastService";
import logOut from "@actions/auth/log-out";
import User from "@js/types/User";

export interface IAuthenticatedTopBarUserProps extends ITopBarUserProps {
    user: User;
}

/**
 * TopBarUser - Defines dropdown user menu in navigational bar. It lists
 * items for user settings, such as 'log out' or 'profile'.
 *
 * @prop {JSX.Element} props
 * @returns {JSX.Element}
 */
export default function AuthenticatedTopBarUser({
    toggleIsUserMenuOpen,
    isUserMenuOpen,
    user,
}: IAuthenticatedTopBarUserProps) {
    // @NOTE: Misc hooks.
    const history = useHistory();
    const dispatch = useDispatch();

    // @NOTE: Log out user.
    const logout = useCallback(async () => {
        const res = await dispatch(logOut());
        window.user = null;
        history.push(routes.home.url);
        ToastService.success(res.payload?.data?.message);
    }, []);

    return (
        <PolarisTopBar.UserMenu
            actions={[
                {
                    items: [
                        {
                            content: routes.profile.label,
                            icon: routes.profile.icon,
                            onAction: () => {
                                history.push(routes.profile.url);
                            },
                        },
                        {
                            content: "Log out",
                            icon: LogOutMinor,
                            onAction: logout,
                        },
                    ],
                },
            ]}
            name={`${user?.first_name} ${user?.second_name}`}
            detail="Customer"
            initials={user?.first_name[0]}
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );
}
