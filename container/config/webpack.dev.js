const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        // good practice to provide publicPath so that the browser knows where to find the files
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            // this isn't used in the container, but is used in the other MFEs
            name: 'container',
            /*
             * These are the MFEs that container will use
             * The key is the name of the MFE used in the container to refer to the MFE
             * The left side of the @ symbol is the name of the MFE found in the webpack.config.js (ModuleFederationPlugin) file of the MFE
             * The right side of the @ symbol is the URL to the remoteEntry.js file
             */
            remotes: {
                marketingMfe: 'marketingModule@http://localhost:8081/remoteEntry.js',
                authMfe: 'authModule@http://localhost:8082/remoteEntry.js',
                dashboardMfe: 'dashboardModule@http://localhost:8083/remoteEntry.js'
            },
            /*
             * These are the shared dependencies that are used in the container
             * All dependencies in the package.json file are shared
             * This might not be the best idea, but it works for now
             */
            shared: packageJson.dependencies
        })
    ],
}

// Merge the common config with the dev config for development packaging
module.exports = merge(commonConfig, devConfig);