const path = require('path')
const webpack = require('webpack')

module.exports = {
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, 'resources/js/source'),
            '@actions': path.resolve(__dirname, 'resources/js/source/actions'),
            '@reducers': path.resolve(__dirname, 'resources/js/source/reducers'),
            '@store': path.resolve(__dirname, 'resources/js/source/store'),
            '@router': path.resolve(__dirname, 'resources/js/source/router'),
            '@constants': path.resolve(__dirname, 'resources/js/source/constants'),
            '@interfaces': path.resolve(__dirname, 'resources/js/source/interfaces'),
            '@pages': path.resolve(__dirname, 'resources/js/source/pages'),
            '@components': path.resolve(__dirname, 'resources/js/source/components'),
            '@common': path.resolve(__dirname, 'resources/js/source/common'),
            '@theme': path.resolve(__dirname, 'resources/js/source/theme'),
        }
    }
}
