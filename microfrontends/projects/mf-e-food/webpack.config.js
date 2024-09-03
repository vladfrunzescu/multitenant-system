const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    output: {
        publicPath: 'http://localhost:4203/',
        uniqueName: 'mfefood',
    },
    optimization: {
        runtimeChunk: false,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'foods',
            library: {type: 'var', name: 'foods'},
            filename: 'remoteEntry.js',
            exposes: {
                EFoodModule: './projects/mf-e-food/src/app/e-food/e-food.module.ts',
            },
            shared: {
                '@angular/core': {eager: true, singleton: true},
                '@angular/common': {eager: true, singleton: true},
                '@angular/router': {eager: true, singleton: true},
            },
        }),
    ],
};
