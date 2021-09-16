// @NOTE: Import library functions.
import { ThemeConfig } from '@shopify/polaris/dist/types/latest/src/utilities/theme';

// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
import routes from '@constants/routes';

const defaultTheme: ThemeConfig = {
    colorScheme: 'light',
    logo: {
        width: 150,
        url: routes.home.url,
        accessibilityLabel: 'Resume generator',
        topBarSource: '/images/devit-logo-horizontal.svg',
    },
};

export default defaultTheme;
