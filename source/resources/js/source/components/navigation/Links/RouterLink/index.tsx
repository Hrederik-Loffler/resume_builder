// @NOTE: Import library functions.
import { Link } from 'react-router-dom';
import { LinkLikeComponentProps } from '@shopify/polaris/dist/types/latest/src/utilities/link';

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

/**
 * RouterLink - link component that's used as linkComponent in Polaris' AppProvider.
 * By default, Polaris uses default link (tag a) which causes page to rerender
 * everytime link is clicked. Use this, React's Link component to prevent
 * this behaviour. See https://polaris.shopify.com/components/structure/app-provider#using-linkcomponent.
 *
 * @returns JSX.Element
 */
export default function RouterLink({ children, url = '', external, ref, ...rest }: LinkLikeComponentProps) {
    // @NOTE: Render component.
    return (
        <Link to={url} {...rest}>
            {children}
        </Link>
    );
}
