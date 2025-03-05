const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
require('dotenv').config({ path: './.env' });
const glob = require('glob-all');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

const env = process.env.NODE_ENV;

const config = {
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|svg|gif|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/resource',
                exclude: /node_modules/
            },
            {
                test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: process.env.NODE_ENV === 'prod' ? '../' : ''
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: env === 'prod' ? '[name].[contenthash].css' : '[name].css',
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            safelist: {
                standard: [/loading$/, /red$/, /green$/],
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/Assets",
                    to: "Assets",
                },
            ],
        }),
    ],
    optimization: env === 'prod' ? {
        minimize: true,
        minimizer: [new TerserPlugin()],
    } : {}
};

module.exports = config;