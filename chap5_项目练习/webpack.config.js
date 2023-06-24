const path = require("path");
//nodejs里的一个模块，帮助拼接路径
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    //指定项目众多文件中的入口文件。源码一般放在src目录下
    entry: "./src/index.ts",
    //指定打包后的文件存放位置
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, "dist"), // 把路径完整地拼出来
        //打包后文件的名字
        filename: "bundle.js",

        //告诉webpack不使用箭头函数和const
        environment: {
            arrowFunction: false,
            const: false
            //如果不希望兼容老版本的浏览器可以不写
        }
    },
    // mode: 'development',
    mode: 'production',
    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //指定规则生效的文件
                test: /\.ts$/,  //使用正则表达式，匹配所有以ts结尾的文件进行编译
                //要使用的loader
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        "targets": {
                                            "chrome": "58",
                                            "ie": "10"
                                        },
                                        "corejs": "3",
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: "ts-loader"
                    }
                ],
                //不参与编译的文件
                exclude: /node_modules/
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    //注意use中loader的执行顺序是从下向上的
                    "style-loader",
                    "css-loader",
                    //引入postcss,配置比较复杂，要放一个对象
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        //和babel配置类似
                                        {
                                            browsers: 'last 2 versions'
                                            //兼容每种浏览器的最新两个版本
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                    //less转换为css后再用css-loader
                ]
            }
        ]
    },
    plugins: [
        //应用html-webpack-plugin插件
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}