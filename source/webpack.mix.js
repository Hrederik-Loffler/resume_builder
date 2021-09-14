const mix = require('laravel-mix');
const path = require('path');


require('laravel-mix-alias');
require('laravel-mix-react-css-modules');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .react()
//     .sass('resources/sass/app.scss', 'public/css');

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
const config = require('./webpack.config');
mix.webpackConfig(config)

mix.copy('resources/images/**', 'public/images');
// mix.copy('resources/favicon.png', 'public/favicon.png');

mix.sass('resources/sass/app.scss', 'public/css')
    .js('resources/js/source/app.jsx', 'public/js')
    .react().reactCSSModules('[path]__[name]___[hash:base64]');


// mix.alias({
//     '@app/store': path.join(__dirname, 'resources/js/source/store'),
//     '@reducers': path.join(__dirname, 'resources/js/source/reducers'),
//     '@app/hooks': path.join(__dirname, 'resources/js/source/hooks'),
//     '@locales': path.join(__dirname, 'resources/js/source/locales'),
//     '@app/common': path.join(__dirname, 'resources/js/source/common')
// });
