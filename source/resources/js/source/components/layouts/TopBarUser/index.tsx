// @NOTE: Import library functions.
import { TopBar as PolarisTopBar } from "@shopify/polaris";
import { LogOutMinor, ProfileMajor } from "@shopify/polaris-icons";

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
 * @prop {JSX.Element} toggleIsUserMenuOpen
 * @prop {JSX.Element} isUserMenuOpen
 * @returns {JSX.Element}
 */
export default function TopBarUser({
    toggleIsUserMenuOpen,
    isUserMenuOpen,
}: ITopBarUserProps) {
    return (
        <PolarisTopBar.UserMenu
            actions={[
                {
                    items: [{ content: "Profile", icon: ProfileMajor }],
                },
                {
                    items: [{ content: "Log out", icon: LogOutMinor }],
                },
            ]}
            name="Scott"
            detail="Snow Devil"
            initials="S"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );
}
