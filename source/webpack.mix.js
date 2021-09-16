const mix = require('laravel-mix');
const path = require('path');


require('laravel-mix-alias');
require('laravel-mix-react-css-modules');
require('laravel-mix-eslint-config');
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
//     .postCss('resources/css/app.css', 'public/css', [
//         //
//     ]);
const config = require('./webpack.config');
mix.webpackConfig(config)

mix.copy('resources/images/**', 'public/images');
mix.copy('resources/favicon.png', 'public/favicon.png');


// mix.webpackConfig({
//     resolve: {
//         alias: {
//             '@actions': path.resolve(__dirname, 'resources/js/source/actions'),
//             '@reducers': path.resolve(__dirname, 'resources/js/source/reducers'),
//             '@store': path.resolve(__dirname, 'resources/js/source/store'),
//             '@router': path.resolve(__dirname, 'resources/js/source/router'),
//             '@constants': path.resolve(__dirname, 'resources/js/source/constants'),
//             '@interfaces': path.resolve(__dirname, 'resources/js/source/interfaces'),
//             '@pages': path.resolve(__dirname, 'resources/js/source/pages'),
//             '@components': path.resolve(__dirname, 'resources/js/source/components'),
//             '@common': path.resolve(__dirname, 'resources/js/source/common'),
//             '@theme': path.resolve(__dirname, 'resources/js/source/theme'),
//         }
//     }
// })
mix.ts('resources/js/index.tsx', 'public/js')
    .eslint({
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {},
    })
    .sass('resources/sass/app.scss', 'public/css')
    .react().reactCSSModules('[path]__[name]___[hash:base64]');
