
const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// txcourse.jsplusplus.com

const config = {
    mode: 'development', //production
    entry: {
        index: path.resolve(__dirname, './src/js/index.js'),
        drag: path.resolve(__dirname, './src/js/drag.js')
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },

            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                loader: [
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                    'image-webpack-loader'
                ]
            },

            {
                test: /\.(woff2?|eot|ttf|oft|svg)(\?.*)?$/i,
                loader: [
                    'url-loader?name=fonts/[name].[ext]'
                ]
            }
        ]
    },

    plugins: [
        new Uglify(),
        new OptimizeCssAssetsPlugin({}),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            title: '折叠面板',
            chunksSortMode: 'manual',
            chunks: ['index'],
            excludeChunks: ['node_modules'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            filename: 'drag.html',
            template: path.resolve(__dirname, 'src/drag.html'),
            title: '拖拽列表',
            chunksSortMode: 'manual',
            chunks: ['drag'],
            excludeChunks: ['node_modules'],
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],

    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        open: true,
        host: 'localhost',
        port: 3200
    }
};

module.exports = config;






