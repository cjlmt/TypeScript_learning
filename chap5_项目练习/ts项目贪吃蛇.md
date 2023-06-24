# TypeScript项目-贪吃蛇

- 目标：学会使用ts的思维，而不是照旧js思维
  - 即所有代码都要基于类来实现，毕竟ts就是一门面向对象的语言
    - （ts并不是面向对象的js，而是js本身就有面向对象，ts只是严格了类型）

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

  - ***index.ts文件是入口文件***，所以把***静态资源在入口文件中引入***，再由webpack一起打包
  - 打包后样式是写在js中来设置的。**如果没有在index.ts中引入，则less不会被转换为css文件，而浏览器无法直接解析less语句。index.ts中引入less文件后，不仅自动转换为css文件，并且在js中应用了这些css样式**

- babel不仅可以处理js的兼容性问题，postcss可以处理css的兼容性问题，新语法转为旧语法

  - `npm i -D postcss postcss-loader postcss-preset-env`

  - postcss核心工具，postcss-preset-env浏览器预置环境

  - 把postcss写到less-loader加载器的上面，**配置起来有点麻烦要写一个对象**

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

  - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621142224425.png" alt="image-20230621142224425" style="zoom:80%;" /> 

## 项目搭建完毕

项目基本结构成型

这些配置不用死记，很多加载器的配置都是套路

## 项目界面

- 结构 - 表现 - 行为

  - 先写静态页面，配合npm start实时刷新页面

  - ```css
    //清除默认样式
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ```

  - less的变量声明

  - ```less
    @bg-color: #b7d4a8;
    //
    background-color: @bg-color;
    ```

  - less的&

  - ```less
    .snake{
        &>div{
            
        }
    }
    //等价于
    .snake>div{
        
    }
    ```

  - 蛇方块空隙

    - ```less
      border:1px solid #b7d4a8
      //因为盒子模型是border-box，所以10px宽高有2px是空的
      //这样子每个小方块固定都是10*10，并且方块之间没有多余空间，更简便
      ```

    - 蛇的位置要改变，所以要设置绝对定位。标准流不能随意更改位置

  - 食物造型

    - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621155356148.png" alt="image-20230621155356148" style="zoom:67%;" /> 

    - ```less
      div {
          position: absolute;
          width: 4px;
          height: 9px;
          background-color: #000;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 1px;
      }
      
      .row {
          transform: translate(-50%, -50%) rotate(45deg);
      }
      
      .col {
          transform: translate(-50%, -50%) rotate(-45deg);
      }
      
      .point {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #b7d4a8;
          width: 1px;
          height: 1px;
      }
      ```

    - 别忘了transform是覆盖的

    - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621161704336.png" alt="image-20230621161704336" style="zoom:77%;" /> 老师的方法![image-20230621161842651](E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621161842651.png)

## 完成food类

- js语法兼容性问题可以在webpack配置文件中修改，可以设置是否出现箭头函数或const

  - ```js
    //告诉webpack不使用箭头函数和const
    environment: {
        arrowFunction: false,
        const: false
    }
    ```

- 一个功能定义一个类

  - 属性：记录当前食物整个页面元素（有HTMLElement这个类型）

  - 构造函数：用于初始化属性（获取页面元素），不需要传入参数

    - 但是有可能获取不到元素，所以报错。可以写一个判断
    - 但是对我们来说food是存在的，可以在可能为空的值后面使用空抑制运算符！
      - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621170845358.png" alt="image-20230621170845358" style="zoom:80%;" /> 

  - 方法：

    - ~~食物消失~~：判断食物的坐标是否和蛇头的坐标相同

    - ~~食物生成~~：食物要随机生成在另一个位置

    - 获取食物x轴的坐标：如果每次都直接引用对象的属性会比较麻烦，这样独立为一个方法直接简单

    - 获取食物y轴的坐标

      - ![image-20230621171826082](E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621171826082.png) ts中get形式方法的简写形式，不用加()，可以当属性使用

    - 修改食物位置：并不是要一直创建新的食物对象（创建一个类不意味着要实例很多的对象）只用修改食物对象的属性即可，但是~~DOM节点确实要在这个方法中销毁和新增~~，元素的left和top值修改后，food对应的dom元素位置就会移动（为啥？页面还会响应式更新吗）

      - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621173639978.png" alt="image-20230621173639978" style="zoom:77%;" />get函数应该从当前页面呈现的偏移量来获取元素位置，如果获取元素的样式不知道为什么获取不到 

      - 食物位置要随机

      - ![image-20230621180402217](E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621180402217.png) 

      - ```tsx
        change() {
            const newX = Math.floor(Math.random() * 30) * 10
            const newY = Math.floor(Math.random() * 30) * 10
            //这里不一定要用floor，也可以使用round四舍五入
            this.element.style.left = newX + 'px'
            this.element.style.top = newY + 'px'
            //一定要记得加px后缀！！！不然无法赋值成功
        }
        ```


## 完成ScorePanel类

- 写成类的形式（面向对象）其实会使得后面开发很方便


- ### 属性

  - 分数score和等级level
  - 要修改页面上的两个元素，所以将那两个显示分数和等级的span获取过来
    - scoreEle + levelEle

- ### 方法

  - 分数和等级会有什么行为：页面上的数字会增加

    - **分数增加函数addScore**：不仅属性加一，还要改变分数dom元素的innerHTML
    - 所以还会有**升级函数**（每提升一个等级速度会越来越快，所以等级要有一个**上限**）

  - 满足一定条件才升级，才调用addLevel，因为分数是addScore控制的，所以应该**在addScore函数中调用addLevel**

    - 为了继续实现扩展性，这里的条件也应该存在属性中由参数自定义

    - ```tsx
      maxLevel: number
      upScore: number
      constructor(maxLevel: number = 10, upScore: number = 10) {
          //参数默认值为10，如果没有传的话
          this.scoreSpan = document.querySelector('#score')!
          this.levelSpan = document.querySelector('#level')!
          this.maxLevel = maxLevel
          this.upScore = upScore
      }
      //加分
      addScore() {
          this.score++
          this.scoreSpan.innerHTML = this.score + ''
          //每10分才升一级
          if (this.score % this.upScore === 0) {
              this.addLevel()
          }
      }
      //升级
      addLevel() {
          if (this.level < this.maxLevel) {
              this.level++
              this.levelSpan.innerHTML = this.level + ''
          }
      }
      ```

- ### 扩展性

  - 食物生成随机位置使用的是数字29，所以只生成0-290之间的整数，屏幕无法改变大小
  - 等级限制的判断写死10也不好，万一要修改也只能改源码
  - **为了灵活性，建议将这些数字设置为一个属性，并且可以由构造函数自定义**

## 类的封装

把所有类写到一个ts文件里不好维护，应该每个类封装为单独一个文件

- src新建modules文件夹下，Food.ts/ScorePanel.ts

- ```tsx
  //每个类放到单独一个文件里
  class Food{
      ···
  }
  //默认暴露
  export default Food
  ```

- index.ts中要使用，默认引入即可

## 初步完成Snake类

snake其实只是一个容器，操作蛇是操作里面的div

- ### 属性：

  - 获取蛇身体的基本元素head（只用获取第一个div）

  - 因为要操作的不只是蛇的头还有身体，所以除了头还要获取整个蛇身体集合

    - querySelectorAll()返回nodelist结点列表（是死的，麻烦）

    - ```tsx
      document.querySelector('#snake').getElementsByTagName('div')
      ```

    - 返回的是一个HTMLcollection

  - ```tsx
    head: HTMLElement;
    //getElementsByTagName返回的是一个HTML元素集合
    bodies: HTMLCollection;
    //要用到抽象的snake盒子用于添加div
    element: HTMLElement;
    constructor() {
        this.element = document.querySelector('.snake')!
        //选择第一个
        this.head = document.querySelector('.snake > div')!
        this.bodies = this.element.getElementsByTagName('div')
    }
    ```

- ### 方法：

  - 因为要判断蛇是否和食物发生碰撞，所以获取蛇头的位置很重要

  - **获取蛇头x轴坐标**

  - **获取蛇头y轴坐标**

  - 蛇还要移动，蛇头移动好说，但是bodies每一个方块都要一起动

  - **setX + setY**设置蛇头的坐标

  - 和食物发生碰撞后，身体要增加一个div。<u>*还是要获取外层snake元素，利用它尾部新增一个div元素*</u>

    - **addBody**往element元素的结束标签之前添加一个div（**使用insertAdjacentHTML("beforeend","\<div>\</div>)"**）

  - ```tsx
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetLeft
    }
    set X(value) {
        this.head.style.left = value + 'px'
    }
    set Y(value) {
        this.head.style.top = value + 'px'
    }
    addBody() {
        this.element.insertAdjacentHTML("beforeend", '<div></div>')
    }
    ```

- 问题：设置蛇头坐标方法不完善（会越界）+ 只控制蛇头的移动

  - addbody不用考虑新div的坐标，因为紧接着就会执行movebody方法，让后面的元素获取前一个元素的坐标


## GameControl键盘事件

需要一个总的类将这三个类整合起来，新建一个**GameControl类(游戏控制器)控制游戏里所有的东西，所有类（核心逻辑**）

***因为整个游戏的运行需要所有不同类的配合，集合它们写在一个类，封装起来也是为了方便维护着想***

- 先在这个类文件中引入其他所有类

- 入口文件中只用引入这个类并且实例化

- ### 属性

  - 实例化基本类并存储为属性

- ### 方法：

  - 游戏初始化init( )，调用后代表游戏开始

    - 可以直接在gamecontronl的构造函数中调用这个方法

    - 初始化要做的事情就是完成鼠标按下可以操作蛇的功能（**绑定键盘事件**）

    - ```tsx
      init(){
      	document.addEventListener('keydown',this.keydownHandler)
          //传回调函数最好不要直接写function，因为直接写字面量，不便于维护，不好找
      }
      ```

    - 特别是业务逻辑过多的时候。所以最好把这个回调函数直接设置为类的一个方法。keydownHandler（事件回调函数命名习惯）

    - ```tsx
      keydownHandler=(event:KeyboardEvent)=>{
          //事件对象有什么用？
          //可以用于获取事件相关信息，比如键盘事件是谁触发的。
          event.key
          //ArrowUp、ArrowDown...
      }
      ```

      - 注意事件对象的数据类型：KeyboardEvent

      - 注意在IE浏览器中，ArrowUp -> Up（keyCode被弃用了）

      - 这里的回调函数应该使用的是箭头函数，这样才能让回调函数中的this指向gamecontrol的对象。普通函数的this~~指向当前作用域~~会指向document。

        - 因为是谁调用，this指向谁。***键盘事件是给document绑定的，所以被触发后相当于被document调用了（事件给谁绑定的，该事件回调中的this就指向谁）***

        - ```tsx
          //另一个解决办法--当初绑定事件的时候就把正确的this(当前对象)通过bind传递给回调函数
          document.addEventListener('keydown',this.keydownHandler.bind(this))
          ```

        - **这里只能用bind，因为这里传的是回调函数，用apply和call绑定会直接执行方法，而bind是返回一个函数**

        - ~~我的天一群人说箭头函数，之前老师配置webpack的时候设置了不编译箭头函数，你设置箭头函数打包压缩后代码也是普通函数~~（貌似还是可以使用箭头函数的，应该是把箭头函数转换为了其它低版本浏览器能够兼容的语法来实现）

      - **this.direction**需要存储按下的按键作为蛇的移动方向（为什么要存储？）

        - 因为蛇本来就是自己会移动的，按下按键不是让蛇运动，而是改变蛇运动的方向！

        - ```tsx
          if (event.key === 'ArrowDown') {
              // this.snake.Y += 10
              // this.snake.Y = (this.snake.Y + 10) % 300
              // 不是290是300
          
              this.direction = 'Down'
          } else if (event.key === 'ArrowRight') {
              // this.snake.X = (this.snake.X + 10) % 300
          
              this.direction = 'Right'
          ```

        - 完全是多次一举，因为<u>已经把方位键排除在外</u>，<u>直接将触发的键值赋值给direction即可</u>

  - **有了方位以后，要让蛇头可以运动，要再单独封装为一个方法**，这里应该使用定时器。每隔一段时间就改变蛇头的坐标，如何改变取决于direction

    - 在键盘事件的回调函数中使用定时器，这样按下按键后就可以开启定时器

## GameControl使蛇移动

- 我们让蛇移动的代码写在了键盘事件回调函数中开启的定时器回调里

- 老师新建了一个方法：run()

- 根据方向direction来修改坐标

  - 应该使用switch来作开关，因为是固定的4个值

  - 为了兼容IE浏览器的Up/...，可以如下

  - ```tsx
    case "Up":
    case "ArrowUp":
    	break;
    ```

- 获取坐标修改后重新赋值给蛇 VS 直接修改蛇的坐标

  - ```tsx
    case 'ArrowUp':
    	this.snake.Y = (this.snake.Y - 10) >= 0 ? (this.snake.Y - 10) : 290
    	break;
    //获取修改
    case 'ArrowUp':
    	Y = (Y - 10) >= 0 ? (Y - 10) : 290
    	break;
    ```

- 调用位置

  - 老师把run直接在init中调用，所以游戏一开始就会运动

  - 我是把移动函数放在键盘事件回调中，按下第一个按键才开始移动。<u>每次键盘事件都要开启关闭定时器确实麻烦</u>

  - 老师做法逻辑更正确，意味着**要给direction一个初始值**

  - 老师实现持续移动的方式，是在run这个方法中调用了延时函数，延时函数的回调是run本身，所以就无限循环下去（注意不能使用定时器）（***注意run的this指向***）

    - 我采用的是开启一个定时器，把移动方法作为定时器的回调，每隔一段时间运行

    - 但是any类型本来就是要避免的

    - run方法中调用自己的this指向问题

      - ![image-20230623112925787](E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230623112925787.png) 

      - 第一次调用this.run()是当前实例对象调用的

      - 第二次调用，延时函数中的回调this.run，注意这里没有加()，不是实例对象调用的，而是延时函数触发后由window调用了该对象身上的方法

      - 第三次调用失败，因为此时this已经指向window，window身上没有run这个方法

      - 解决：使用bind传递this指向

      - ```tsx
        setTimeout(this.run.bind(this), this.time)
        ```

  - 升级后移动速度加快，可以对属性time作手脚，也可以直接在延时器里运算

    - ```tsx
      setTimeout(this.run.bind(this), this.time - (this.scorePanel.level - 1) * 30)
      ```

- **不可以撞墙**/撞自己，否则游戏结束

  - 所以要有一个变量记录蛇是否死亡（~~直接撞了退出游戏不就好了~~，这样方便停止延时器运行）

  - ```tsx
    this.isLive && setTimeout(···)
    ```

  - 当isLive为true时(蛇还活着)，才进行后面的延时器。蛇设置为false后，就不动了

## 蛇撞墙+吃食检测

蛇撞墙死亡只和蛇自己有关，所以撞墙检测应该写在snake类中

- 避免坐标的多余修改

  - 蛇移动的run方法中，因为可以任意修改移动的方向，所以不管是蛇的x轴还是y轴坐标都会重新赋值，但是对于没有修改的轴坐标重新赋值是多余的，毕竟每次修改只会修改其中一个方向的坐标，所以需要避免无用的赋值

  - ```tsx
    if (this.Y === value) {
        return
    }
    ```

  - 如何表明蛇撞墙了，最简单的做法可以抛出异常，程序终止

    - ```tsx
      if(value <0|| value>290){
          throw new Error("蛇撞墙了");
      }
      ```

    - 程序终止这样子根本不会把非法值赋值给蛇坐标，蛇不会越界

  - 但是直接抛出错误对用户不友好，这个时候可以对异常可能产生的代码使用**try-catch**包裹，**这样就不会报错，也不会导致程序的终止，需要对错误进行处理**

    - ```tsx
      try {
          this.snake.X = X
          this.snake.Y = Y
      } catch (e: any) {
          alert(e.message + 'GAME OVER')
          this.isLive = false
      }
      ```

- 吃食物因为是蛇和食物两个类的交流，所以放到gamecontrol中定义单独的方法

  - ```tsx
    //检测蛇是否吃到食物，以及吃到后的响应
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
    ```

  - 返回一个布尔值

- 面向对象：设计什么功能，就去找对应的对象修改。要实现某个功能，就调用特定对象身上的方法

  - 单一职责原则：一个类只做一件事（维护起来简单）

## 身体移动

- 需要解决的问题：蛇的身体移动，身体碰撞，掉头？

- 蛇的身体移动（**movebody方法**）
  - 只涉及到蛇，所以写在蛇类中
  - ~~身体其实根本不用动，只有增加头和移除尾两步~~
  - **思路**：一个个修改body元素的坐标为前一个元素的坐标，但是要**从后往前改**，这样才能获取到它们原来的坐标
  - ```tsx
    moveBody() {
        let behind, front
        for (let i = this.bodies.length - 1; i > 0; i--) {
            behind = <HTMLElement>this.bodies[i]
            front = <HTMLElement>this.bodies[i - 1]
            behind.style.left = front.style.left
            behind.style.top = front.style.top
        }
    }
              //改进  
                moveBody() {
                    let X: number
                    let Y: number
                    let behind
                    for (let i = this.bodies.length - 1; i > 0; i--) {
                        X = (this.bodies[i - 1] as HTMLElement).offsetLeft
                        Y = (this.bodies[i - 1] as HTMLElement).offsetTop
                        behind = (this.bodies[i] as HTMLElement)
                        behind.style.left = X + 'px'
                        behind.style.top = Y + 'px'
                    }
                }
    ```

    - ts中的Element如果不存在某个属性
      - ***HTMLCollection里面的类型是Element，Element是一个接口，HTMLElement是一个子接口，明确这个Element可以是一个HTMLElement，所以要做一个类型断言告诉他就是一个HTMLElement***
      - `this.bodies[i] as HTMLElement`

- 蛇掉头，向右走时不能向左掉头，向上走不能向下掉头，其他情况亦然

  - 我觉得应该在键盘事件中判断，老师说在set X/Y中判断(错的)

  - ```tsx
    let second = <HTMLElement>this.snake.bodies[1] || null	
            // 只有head元素的情况
    if (!second) {
        this.direction = event.key
        return
    }
    //我的方法
    if (this.direction === 'ArrowUp' && event.key === 'ArrowDown') {
        return
    } else if (this.direction === 'ArrowLeft' && event.key === 'ArrowRight') {
        return
    } else if (this.direction === 'ArrowRight' && event.key === 'ArrowLeft') {
        return
    } else if (this.direction === 'ArrowDown' && event.key === 'ArrowUp') {
        return
    }
    this.direction = event.key
    ```

    - 我原本的方法是，比较第二个节点与蛇头的坐标来判断出蛇的运动方向，避免与第二个节点发生冲突（多此一举）
    - 我的方法：判断方向（也不错）
      - 不过理论上来说只有蛇头应该也不允许掉头（去掉second的判断即可）
    
  - 判断蛇头坐标是否和第二节坐标一样即可（在蛇头坐标真的修改为第二节坐标之前判断）

    - 不管哪个方法都要注意排除一开始只有一个蛇头的情况

    - 但是direction已经被修改，怎么按照原来的方向继续前进

    - ```tsx
      if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
          console.log('水平方向发生了掉头')
          //如果发生了掉头，就让蛇一直往反方向移动
          if(value > this.X){
              value = this.X -10
          }else{
              value = this.X +10
          }
      }
      //垂直方向类似
      ```

- 身体碰撞

  - 我是写在持续执行的run运动函数中的try-catch里

    - ```tsx
      for (let i = 1; i < this.snake.bodies.length; i++) {
          let item = this.snake.bodies[i] as HTMLElement
          if (X === item.offsetLeft && Y === item.offsetTop) {
              //不可以单纯的+转换，要用parseInnt
              //一定要用经过运算的X和Y
              throw new Error("蛇撞到身体了");
          }
      }
      ```

  - **老师还是按照谁的功能就写到哪个类里的规范**，在snake中检查蛇头和每一截身体的坐标是否重叠

    - checkHeadBody()

    - ```tsx
      for (let i = 1; i < this.snake.bodies.length; i++) {
          let item = this.snake.bodies[i] as HTMLElement
          if (X === item.offsetLeft && Y === item.offsetTop) {
              throw new Error("蛇撞到身体了");
          }
      }
      //和我的逻辑是一模一样的
      ```

    - 在X/Y轴的set函数中调用该方法，因为gamecontrol中已经对坐标赋值用try-catch包裹了，所以抛出异常就完事


所有的代码都是以类来区分的，每个类作用不同，方便维护（主要还是要类设计的好）

















