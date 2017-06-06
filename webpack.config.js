const htmlwebpackplugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './dict'),
        filename: 'js/[name]-[hash].js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: 'postcss-loader',
                options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                    plugins: (loader) => [
                        require('postcss-import')({root: loader.resourcePath}),
                        require('autoprefixer')(), //CSS浏览器兼容
                        require('cssnano')()  //压缩css
                    ]
                }
            },
                {
                    loader: "sass-loader",// compiles Sass to CSS,
                    options: {include: path.resolve(__dirname, 'src/components/')}
                },]
        },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }],
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                include: path.resolve(__dirname, 'src/'),
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1} //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
                    },
                    {
                        loader: 'postcss-loader',
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(), //CSS浏览器兼容
                                require('cssnano')()  //压缩css
                            ]
                        }
                    }
                ]
            },{
                test: /\.(png|jpg|gif|svf)$/i,
                use: [
                    {
                        loader:'file-loader',
                        options:{
                            name:'assets/[name]-[hash:5].[ext]',
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                quality: 65
                            },
                        }
                    },
                ],

            },
        ],
    },
    plugins: [
        new htmlwebpackplugin({
            template: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 5 versions']
                    })
                ]
            }
        })
    ],
}