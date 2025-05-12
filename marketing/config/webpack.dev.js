const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8081/'
    },
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        // only standalone deployment needs the html provided by marketing
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // The ModuleFederationPlugin config could be common
        new ModuleFederationPlugin({
            // the name is how the MFE is referenced inside the remotes map in the container
            name: 'marketingModule',
            // the filename is the name of the file that is created in the build folder
            filename: 'remoteEntry.js',
            // the exposes map is used to expose the MFE to the container and how to reference it inside the MFE's module
            exposes: {
                './MarketingApp' : './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ],
}

module.exports = merge(commonConfig, devConfig);