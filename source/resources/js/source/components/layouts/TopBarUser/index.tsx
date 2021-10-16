// @NOTE: Import from libraries.
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

// @NOTE: Import from own files.
import useAuth from "@js/hooks/useAuth";
import UnauthenticatedTopBarUser from "@components/layouts/TopBarUser/Unauthenticated";
import AuthenticatedTopBarUser from "@components/layouts/TopBarUser/Authenticated";
import logOut from "@actions/auth/log-out";
import routes from "@constants/routes";
import ToastService from "@services/ToastService";

/**
 * ITopBarUserProps - props for `TopBarUser` component.
 */
export interface ITopBarUserProps {
    isUserMenuOpen: boolean;
    toggleIsUserMenuOpen: () => void;
}

/**
 * TopBarUser - Defines dropdown user menu in navigational bar. It lists
 * items for user settings, such as 'log out' or 'profile'.
 *
 * @prop {JSX.ITopBarUserProps} props
 *
 * @returns {JSX.Element}
 */
export default function TopBarUser(props: ITopBarUserProps) {
    // @NOTE: Misc hooks.
    const user = useAuth();

    // @NOTE: If user is not authenticated, show one navbar.
    if (!user) {
        return <UnauthenticatedTopBarUser {...props} />;
    }

    return <AuthenticatedTopBarUser user={user} {...props} />;
}
