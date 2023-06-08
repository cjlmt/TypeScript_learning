# webpack插件&设置

- 经过一系列的配置，使得TS和webpack已经结合到了一起，已经可以把ts转换为js了


##### 痛点：

- 要运行这个js文件，要**先创建一个html文件再引入**，有些麻烦。而且如果一个页面引入了js和一些css，那么这些**资源都要一个一个引入**，比较麻烦


##### 目的：

- **【webpack自动创建html文件，并且自动引入项目的js或css相关的资源文件】**

## 【插件1】自动创建html文件

- #### 安装插件

  - `npm i -D html-webpack-plugin`

- #### 配置插件

  - 在webpack.config.js中**引入**html插件

    - `const HTMLWebpackPlugin = require('html-webpack-plugin');`

  - 在webpack.config.js中**应用**插件，使得webpack中可以使用这个插件

    - ```js
      plugins:[
          //记得plugin加s
          new HTMLWebpackPlugin()
      ]
      ```

  - 此时就可以***实现自动生成html，并引入相关的资源***

- #### 自定义html文件

  - ```js
    plugins:[
        //可以在配置对象参数中对生成的html文件进行配置
        new HTMLWebpackPlugin({
            title: '这是一个自定义的title'
        })
    ]
    ```

  - 但是如果一个一个配置html文件的配置项很麻烦，希望网页有基本的结构

    - 可以在src中写一个模板html文件

    - ```js
      plugins:[
          //可以在配置对象参数中对生成的html文件进行配置
          new HTMLWebpackPlugin({
              template: './src/index.html'
          })
      ]
      ```


## 【插件2】自动运行网页服务器并自动刷新

- **【希望打开网页的服务器和项目是有关联的，*当项目更改后，自动重新构建并刷新网页*】**

- #### 安装插件-webpack开发服务器（webpack-dev-server）

  - `npm i -D webpack-dev-server`

  - ##### 给项目安装一个内置服务器供项目运行，并且和webpack的编译相关联

- #### 在package.json项目描述文件中设置*指令*

  - ```json
    "scripts":{
        "start":"webpack serve --open chrome.exe"
        //启动webpack服务器，并且用chrome打开网页
    }
    ```

  - **不用手动打开浏览器运行网页；不用每次修改都去去手动打包项目，直接修改项目保存刷新即可。**

  - #### `注意，运行webpack-dev-server时，打包编译项目不会生成文件`

## 【插件3】清除上次编译文件

- **【每次编译前将所有旧文件清除，再编译生成新的文件，防止多余文件存在】**

  - `npm i -D clean-webpack-plugin`

- 引入插件、应用插件方法和html-webpack-plugin一模一样

  - ```js
    const {CleanWebpackPlugin} = require('clean-webpack-plugin')
    //不是默认暴露，是分别暴露，需要大括号
    
    plugins:[
        new CleanWebpackPlugin()
    ]
    ```

- #### `注意，和webpack-dev-server搭配使用时，虽然不生成文件，但是进行了编译还是会删除原有生成文件`

## 【配置4】导入导出ts模块文件

- #### m1.ts

  - ```tsx
    export let hi: string = 'hello'
    ```

- #### index.ts

  - ```tsx
    import { hi } from "./m1";
    console.log(hi)
    ```

- **【*会报错，因为webpack不知道ts可以作为模块使用，不知道哪些文件可以被引入*】**

  - 告诉webpack哪些文件可以作为模块被引入

- #### 配置webpack.config.js

  - ```js
    //设置引用模块
    resolve:{
        //模块文件扩展名
        extensions:['.ts','.js']
    }
    ```

## 【5】解决mode报错

- webpack4.0对语法要求更加严格，要求我们在运行 webpack时必须在 “开发或者生产” 中选择一种模式，没有设置webpack模式，就会产生报错。

  - ```shell
    The 'mode' option has not been set, webpack will fallback to 'production' for this value
    ```

  - ```js
    // 设置mode
    mode: 'development'
    ```



- 兼容性问题
  - 编译打包生成的js文件语法很新，兼容性不好。需要一个工具来修改代码以改善兼容性