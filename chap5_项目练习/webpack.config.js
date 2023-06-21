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
                                            "ie": "11"
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