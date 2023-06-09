# webpack+Babel

虽然已经对webpack进行了一些配置，但实际开发中还是不够，需要**【webpack结合babel来对代码进行转换以使其可以兼容到更多的浏览器】**（也是一个打包工具，可以结合webpack一起使用，完成一些功能）

- 但是ts编译器不是也可以设置编译的js版本吗，因为**ts编译器只能做一些简单的语法转换**，对于复杂的比如ES6新增的promise就无法转换，只能依赖babel

#### 功能：

- 把新语法转换为旧语法

- 让旧版本浏览器也能支持新的技术（比如promise等）增强兼容性

- #### `最大的意义就是：编写代码时不用在乎使用什么语法，最后都可以给你转成目标浏览器兼容的代码`

配置好ts和webpack的连接后，通过以下步骤再将babel引入到项目中：

- ### 安装依赖包：

   - ```npm i -D @babel/core @babel/preset-env babel-loader core-js```
   - 共安装了4个包，分别是：
     - @babel/core
       - **babel的核心工具**
     - @babel/preset-env
       - **babel的预定义环境，不同浏览器环境下转换不同形式的代码以兼容**
     - @babel-loader
       - **【用于babel在webpack中的加载器】，类比ts-loader**
     - core-js
       - core-js用来使老版本的浏览器支持新版ES语法，给旧浏览器提供一个新环境
       - **【代码中有特殊类比如promise的时候才会用到这个插件，babel本身处理不了】**
       - **【相当于引入了自己写的可以让旧版本看懂的promise】**

- ### 修改webpack.config.js配置文件

   - ##### `加载器的顺序是从后往前执行，先用ts-loader把ts代码转换为js，再使用babel将bundle.js转换为用于兼容的旧版js`

   - ```javascript
     ...略...
     module: {
         rules: [
             {
                 test: /\.ts$/,
                 use: [
                     //配置webpack和babel的关联。
                     //指定规则中对ts文件的处理要使用两个加载器
                     {
                         //除了指定写一个加载器，还要对其进行一些选项的配置，所以外面要用括号包裹（复杂版）
                         //简化版可以直接写一个“ts-loader”
                         loader: "babel-loader",
                         options:{
                             //设置babel要兼容的浏览器（设置预定义的环境）
                             presets: [
                                 [
                                     //指定环境的插件
                                     "@babel/preset-env",
                                     //插件的配置对象
                                     {
                                         "targets":{
                                             //指定目标浏览器的版本
                                             "chrome": "58",
                                             //典型老版本
                                             "ie": "11"
                                         },
                                         //指定core.js的版本
                                         "corejs":"3",
                                         //使用core.js的方式：按需加载
                                         "useBuiltIns": "usage"
                                     }
                                 ]
                             ]
                         }
                     },
                     {
                         loader: "ts-loader",
     
                     }
                 ],
                 exclude: /node_modules/
             }
         ]
     }
     ...略...
     ```

   - **<u>*babel处理后的js代码的版本取决于你设置的浏览器能兼容的版本，如果你设置的浏览器版本都比较新，可以兼容新语法，那么babel转换后的js也采用新语法（比如ES6）*</u>**

- #### 注意：

  - 明明配置好了babel也配置好了core，为什么无法在ie中运行，显示( ) = >有误

    - 因为webpack打包编译后生成的bundle.js里面往往都是一个立即执行函数（箭头函数），创建一个单独的作用域，避免代码之间产生干扰。但是ie使用的旧语法不支持箭头函数。

  - babel难道处理不了箭头函数吗？

    - 自己写的箭头函数，babel是可以转换为普通函数的。webpack打包自动生成的立即执行函数不是我们手写的，压根没有经过babel的处理（webpack自带的，不愿意兼容ie）

  - 修改webpack.config.js配置，让webpack知道我要兼容老版本浏览器

    - ```js
      output: {
          //指定打包文件的目录
          path: path.resolve(__dirname, "dist"), // 把路径完整地拼出来
          //打包后文件的名字
          filename: "bundle.js",
          
          //配置打包环境
          environment:{
              //告诉webpack不使用箭头函数
              arrowFunction:false;
          }
      },
      ```

    - 这样在ie中运行就没有问题了

- 如此一来，使用ts编译后的**js文件将会再次被babel处理**，使得**代码可以在大部分浏览器中直接使用**，可以【**在配置选项的targets中指定要兼容的浏览器版本**】。

  - **ts是对整个项目进行打包编译，babel是对打包编译后的那一个bundle.js进行处理**
  - 可以在ts的编译器配置中设置目标js版本是ES6，因为不使用ts编译器进行兼容性。



#### 使用vue构建项目工具vite或vue-cli不用配置这么麻烦，本身就是基于webpack的封装，已经配置好了，很方便。webpack过时了？