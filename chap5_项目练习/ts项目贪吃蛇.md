# TypeScript项目-贪吃蛇

- 目标：学会使用ts的思维，而不是照旧js思维
  - 即所有代码都要基于类来实现，毕竟ts就是一门面向对象的语言

## 1.正式项目搭建

- 项目搭建要借助webpack（***但实际上，项目搭建都使用框架，框架内置打包工具，有一些是基于webpack的比如vue-cli***）

  - 直接使用之前配置好的三个配置文件（项目信息文件package.json+ts配置tsconfig.json+webpack配置webpack.config.js）

  - 修改package.json：项目名字
  - 修改tsconfig.json：开启noEmitOnError，防止错误代码被打包
  - 配置好直接使用`npm run build`进行构建

- 下载依赖（依赖只是下载到特定目录下的，不同的目录要重新下载）
  - `npm i`指令直接下载package.json中所需的所有依赖
- 创建src文件夹
  - 创建网页模板-index.html
  - 创建ts代码-index.ts
- 编译项目生成dist文件夹

## 2.webpack再配置

webpack可以结合ts编译器，也结合了babel，但是无法对css样式文件进行处理，所以还需要在webpack中应用css插件。这里使用css的预处理语言less

- 安装less `npm i -D less less-loader css-loader style-loader`

  - less-loader是less加载器，用于连接webpack
  - css-loader处理css代码
  - style-loader将css引入到项目中

- 改webpack配置文件

  - 在module中添加一个新的rule

  - ```tsx
    //设置less文件的处理
    {
        test:/\.less$/,
        use:[
            //注意use中loader的执行顺序是从下向上的
            "style-loader",
            "css-loader",
            "less-loader"
            //less转换为css后再用css-loader
        ]
    }
    ```

- 创建style文件夹创建index.less

- ts文件中引入样式`import './style/index.less';`

  - ts文件是入口文件，所以把静态资源在入口文件中导入，再由webpack一起打包
  - 打包后样式其实是写在js中的

- babel不仅可以处理js的兼容性问题，postcss可以处理css的兼容性问题，新语法转为旧语法

  - `npm i -D postcss postcss-loader postcss-preset-env`

  - postcss核心工具，postcss-preset-env浏览器预置环境

  - 把postcss写到less-loader加载器的上面，配置起来有点麻烦要写一个对象

  - ```js
    "css-loader",
    //引入postcss
    {
    	loader:"postcss-loader",
        options:{
            postcssOptions:{
                plugins:[
                    [
                        "postcss-preset-env",
                        //和babel配置类似
                        {
                            browsers:'last 2 versions'
                            //兼容每种浏览器的最新两个版本
                        }
                    ]
                ]
            }
        }
    },
    "less-loader"
    ```

  - 某些样式非常简单，任何浏览器的语法都支持，所以不会做转换。flex弹性布局是新语法

## 项目搭建完毕

项目基本结构成型

这些配置不用死记，很多加载器的配置都是套路























