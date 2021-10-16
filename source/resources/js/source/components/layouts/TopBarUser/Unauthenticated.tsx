// @NOTE: Import library functions.
import { TopBar as PolarisTopBar } from "@shopify/polaris";
import { useHistory } from "react-router";

// @NOTE: Import from own files.
import routes from "@constants/routes";
import { ITopBarUserProps } from "@components/layouts/TopBarUser";

/**
 * TopBarUser - Defines dropdown user menu in navigational bar. It lists
 * items for user settings, such as 'log out' or 'profile'.
 *
 * @prop {JSX.Element} toggleIsUserMenuOpen
 * @prop {JSX.Element} isUserMenuOpen
 * @returns {JSX.Element}
 */
export default function UnauthenticatedTopBarUser({
    toggleIsUserMenuOpen,
    isUserMenuOpen,
}: ITopBarUserProps) {
    const history = useHistory();

    return (
        <PolarisTopBar.UserMenu
            actions={[
                {
                    items: [
                        {
                            content: routes.authSignIn.label,
                            icon: routes.authSignIn.icon,
                            onAction: () => {
                                history.push(routes.authSignIn.url);
                            },
                        },
                    ],
                },
            ]}
            name="Guest"
            detail="Guest"
            initials="G"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );
}
