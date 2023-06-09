# webpack+typescript

通常情况下，实际开发中我们都需要**使用构建工具对代码进行打包/编译**，**TS同样也可以结合构建工具/打包工具一起使用**，下边以webpack为例介绍一下如何结合构建工具使用TS。

​		构建工具可以进行的配置比较多

- ***【最基本的使用webpack编译打包ts代码功能的配置过程】***

## 步骤：

1. ### 初始化项目

   - 进入项目根目录，执行命令 ``` npm init -y```
     - 主要作用：创建**package.json**文件（**用于管理项目**）

2. ### 下载构建工具

   - ```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```
     - -D安装开发依赖 
     - 共安装了7个包（**安装所需依赖**）
       - **webpack**
         - 构建工具webpack
       - **webpack-cli**
         - webpack的命令行工具
       - webpack-dev-server
         - webpack的开发服务器
       - **typescript**
         - ts编译器
       - **ts-loader**
         - ts加载器，用于在**webpack中编译ts文件（将webpack和typescript进行整合，才能在webpack中使用ts编译器）**
       - html-webpack-plugin
         - webpack中html插件，用来自动创建html文件
       - clean-webpack-plugin
         - webpack中的清除插件，每次构建都会先清除目录

3. ### 根目录下创建webpack的配置文件*webpack.config.js*

   - 【1】配置好webpack.config.js就可以使用webpack了

   - ```javascript
     const path = require("path");
     //nodejs里的一个模块，帮助拼接路径
     const HtmlWebpackPlugin = require("html-webpack-plugin");
     const { CleanWebpackPlugin } = require("clean-webpack-plugin");
     
     //webpack中的所有的配置信息都应该写在module.exports中
     module.exports = {
         optimization:{
             minimize: false // 关闭代码压缩，可选
         },
     
         //指定项目众多文件中的入口文件。源码一般放在src目录下
         entry: "./src/index.ts",
         
         devtool: "inline-source-map",
         
         devServer: {
             contentBase: './dist'
         },
     
         //指定打包后的文件存放位置
         output: {
             //指定打包文件的目录
             path: path.resolve(__dirname, "dist"), // 把路径完整地拼出来
             //打包后文件的名字
             filename: "bundle.js",
             environment: {
                 arrowFunction: false // 关闭webpack的箭头函数，可选
             }
         },
     
         resolve: {
             extensions: [".ts", ".js"]
         },
         
         //指定webpack打包时要使用的模块
         module: {
             //指定要加载的规则
             rules: [
                 {
                     //指定规则生效的文件
                     test: /\.ts$/,  //使用正则表达式，匹配所有以ts结尾的文件进行编译
                     //要使用的loader
                     use: {
                        loader: "ts-loader"     
                     },
                     //不参与编译的文件
                     exclude: /node_modules/
                 }
             ]
         },
     
         plugins: [
             new CleanWebpackPlugin(),
             new HtmlWebpackPlugin({
                 title:'TS测试'
             }),
         ]
     
     }
     ```

4. ### 根目录下创建tsconfig.json，配置可以根据自己需要

   - 【2】但是**光配置webpack还不行，要对ts文件进行编译**，所以还需要一个**配置文件指定ts的编译规范** --- tsconfig.json

   - ```json
     {
         "compilerOptions": {
             "target": "ES2015",
             "module": "ES2015",
             "strict": true
         }
     }
     ```

5. ### 修改package.json添加如下配置

   - 【3】最后一步

   - ```json
     {
       ...略...
       "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1",
         "build": "webpack",
         //可以通过build命令直接执行webpack
         "start": "webpack serve --open chrome.exe"
       },
       ...略...
     }
     ```

6. ### 在src下创建ts文件

   - 在命令行执行```npm run build```使用webpack对代码进行编译和打包
   - 或者执行```npm start```来启动开发服务器

- 总结
  - 先初始化我们的项目，得到package.json文件，它是一个项目描述工具，记录了当前项目的许多信息。随后安装使用webpack所要用到的各种依赖，配置webpack的配置文件webpack.config.js，指定一下打包时的某些规范以及打包用到的加载器，此时webpack准备好了。但是ts编译器还需要小小编译一下，设置好要编译的js版本等等。最后简单配置一下项目描述文件package.json即可使用webpack打包typescript代码