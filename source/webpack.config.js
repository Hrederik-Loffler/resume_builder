const path = require('path')
const webpack = require('webpack')

module.exports = {
    resolve: {
        alias: {
            '@app/store': path.resolve(__dirname, 'resources/js/source/store'),
            '@reducers': path.resolve(__dirname, 'resources/js/source/reducers'),
            '@app/hooks': path.resolve(__dirname, 'resources/js/source/hooks'),
            '@locales': path.resolve(__dirname, 'resources/js/source/locales'),
            '@app/common': path.resolve(__dirname, 'resources/js/source/common')
        }
    }
}
