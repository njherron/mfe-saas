const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    },
    plugins: [
        // this plugin will inject the script tag including the webpack main.js into the index.html file
        new HtmlWebpackPlugin({
            // this is the template file that will be used to generate the index.html file
            template: './public/index.html'
        })
    ]
}