const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

// PRODUCTION_DOMAIN is set during the CI Action taken care of by the GitHub Actions workflow
// This value is stored in the GitHub Secrets
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        // the publicPath is the URL where the files are hosted in production (S3 bucket)
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            // The remotes map need to use the url of the production server
            remotes: {
                marketingMfe: `marketingModule@${domain}/marketing/latest/remoteEntry.js`,
                authMfe: `authModule@${domain}/auth/latest/remoteEntry.js`,
                dashboardMfe: `dashboardModule@${domain}/dashboard/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}

// Merge the common and production configuration for the production package
module.exports = merge(commonConfig, prodConfig);