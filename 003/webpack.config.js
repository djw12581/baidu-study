const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

let pathsToClean = [
    'dist',
]
const config = {
    entry: {
        'bundle': './src/index.js',

    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: false,
            },
            hash: true,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 9000,
        open: true,
        hot: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                }
            },
            {
                test: /\.san$/,
                loader: [
                    'san-loader'
                ]
            }
        ],
    },
    resolve: {
        alias: {
            san: process.env.NODE_ENV === 'production' ?
                'san/dist/san.js' : 'san/dist/san.dev.js',
        }
    }
};
module.exports = config