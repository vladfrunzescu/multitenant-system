const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    output: {
        publicPath: 'http://localhost:4204/',
        uniqueName: 'mfemarket',
    },
    optimization: {
        runtimeChunk: false,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'market',
            library: {type: 'var', name: 'market'},
            filename: 'remoteEntry.js',
            exposes: {
                EMarketModule: './projects/mf-e-market/src/app/e-market/e-market.module.ts',
            },
            shared: {
                '@angular/core': {eager: true, singleton: true},
                '@angular/common': {eager: true, singleton: true},
                '@angular/router': {eager: true, singleton: true},
            },
        }),
    ],
};
