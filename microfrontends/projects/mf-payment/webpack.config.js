const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    output: {
        publicPath: 'http://localhost:4202/',
        uniqueName: 'mfpayment',
    },
    optimization: {
        runtimeChunk: false,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'payment',
            library: {type: 'var', name: 'payment'},
            filename: 'remoteEntry.js',
            exposes: {
                PaymentModule: './projects/mf-payment/src/app/payment/payment.module.ts',
            },
            shared: {
                '@angular/core': {eager: true, singleton: true},
                '@angular/common': {eager: true, singleton: true},
                '@angular/router': {eager: true, singleton: true},
            },
        }),
    ],
};
