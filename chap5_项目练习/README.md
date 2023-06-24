# TypeScript项目-贪吃蛇

- 目标：学会使用ts的思维，而不是照旧js思维。***即所有代码都要基于类来实现***

## 1.准备工作

配置不用死记

### 正式项目搭建

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

### webpack再配置(CSS&兼容)

目前webpack可以结合ts编译器，也可以结合babel对js进行兼容处理，但是无法对css样式文件进行处理，所以还需要在webpack中应用css插件。这里使用css的预处理语言less

- js语法兼容性问题可以在webpack配置文件中修改，可以设置是否出现箭头函数或const

  - ```js
    //告诉webpack不使用箭头函数和const
    environment: {
        arrowFunction: false,
        const: false
    }
    ```

#### 安装less

-  `npm i -D less less-loader css-loader style-loader`
- less-loader是less加载器，用于连接webpack
- css-loader处理css代码
- style-loader将css引入到项目中

#### 修改webpack配置文件

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

#### Postcss兼容

- babel可以处理js的兼容性问题，postcss可以处理css的兼容性问题，新语法转为旧语法

  - 某些样式非常简单，任何浏览器的语法都支持，所以不会做转换

  - 新的样式语法比如：flex弹性布局

  - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621142224425.png" alt="image-20230621142224425" style="zoom:65%;" /> 

- #### 安装

  - `npm i -D postcss postcss-loader postcss-preset-env`
  - postcss核心工具，postcss-preset-env浏览器预置环境

- #### webpack配置

  - **配置起来有点麻烦要写一个对象**，把postcss写到less-loader加载器的上面

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

### 样式文件编写

- 创建style文件夹创建index.less

- #### 在index.ts文件中引入样式

  - `import './style/index.less';`
  - ***index.ts文件是入口文件***，所以把***静态资源在入口文件中引入***，才会经过webpack一起打包，less才会转换为css，并且在js中应用转换后的css样式

## 2.项目界面

先写静态页面，配合`npm start`实时刷新页面

- ##### 清除默认样式

  - ```css
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ```


- ##### less用法简单回顾

  - ```less
    @bg-color: #b7d4a8;
    //变量声明
    background-color: @bg-color;
    ```

  - &简便修饰符，父子选择器并列

  - ```less
    .snake{
        &>div{
            
        }
    }
    //等价于
    .snake>div{
        
    }
    ```

- ##### 蛇方块空隙

  - ```less
    border:1px solid #b7d4a8
    //因为盒子模型是border-box，所以10px宽高有2px是空的
    //这样子每个小方块固定都是10*10，并且方块之间没有多余空间，更简便
    ```

- ##### 食物造型

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

  - **transform不是基于上一次transform的结果作变换，而是基于初始状态重新作变换**

  - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621161704336.png" alt="image-20230621161704336" style="zoom:77%;" /> flex也可以灵活地进行排列（老师制作的![image-20230621161842651](E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621161842651.png))


## 类的封装

- ##### 一个功能定义一个类。写成类的形式（面向对象）会使得后面开发和维护都很方便

  - 单一职责原则：一个类只做一件事（维护起来简单）
  - 面向对象思维：要实现某个功能，就调用特定对象身上的方法
  - 但是把所有类写到一个ts文件里不好维护，应该每个类封装为单独一个文件（Food.ts/ScorePanel.ts）
  - 当然很重要的一点还是类要设计的好

- src下新建modules文件夹

  ```tsx
  //每个类放到单独一个文件里
  class Food{
      ···
  }
  //默认暴露
  export default Food
  ```

- index.ts或者***总控制类***要使用，在其中默认引入即可

## 3.完成food类

- #### 属性：

  - 食物的页面元素（HTMLElement类型）

- #### 构造函数：

  - 用于初始化属性（获取页面元素），不需要传入参数
  - 但是有可能获取不到元素，所以报错。可以写一个判断
  - 但是对我们来说food是存在的，可以在可能为空的值后面使用**【空抑制运算符！】**
    - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621170845358.png" alt="image-20230621170845358" style="zoom:80%;" /> 

- #### 方法：

  - 获取食物x轴的坐标：如果每次都直接DOM元素的偏移量会比较麻烦，这样独立为一个方法直接简单

  - 获取食物y轴的坐标

    - <img src="E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230621171826082.png" alt="image-20230621171826082" style="zoom:80%;" /> ts中get形式方法的简写形式，不用加()，可以当属性使用

    - ##### 理论上写return元素的style.top/left也可以，但是前提是样式原本就是元素的内嵌样式，否则为空

  - 修改食物位置change()：

    - 并不是要一直创建新的食物对象（创建一个类不意味着要实例很多的对象）只用修改食物对象的属性即可，元素的left和top值修改后，food对应的dom元素位置就会移动

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


## 4.完成ScorePanel类


- ### 属性

  - 分数score和等级level 以及页面上对应span的DOM元素

- ### 方法

  - **分数增加函数addScore**：不仅属性score加一，还要改变对应页面元素的innerHTML
  - **升级函数**：（每提升一个等级速度会越来越快，所以等级要有一个**上限**）

  - 满足一定条件才升级，才调用addLevel，因为分数是addScore控制的，所以应该**在addScore函数中调用addLevel**

- ### 扩展性


  - 食物生成随机位置使用的是数字29，所以只生成0-290之间的整数，屏幕无法改变大小

  - 等级限制的判断写死10也不好，万一要修改也只能改源码

  - **为了灵活性/扩展性，建议将这些数字设置为一个属性，并且可以由构造函数自定义**

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


## 5.初步完成Snake类

snake其实只是一个容器，操作蛇是操作里面的div

- ### 属性：

  - ##### 获取蛇头的HTML元素

  - **获取蛇身的HTML元素**（因为要操作的不只是蛇的头还有身体，所以除了头还要获取整个蛇身体集合）

    - 获取HTML元素集合有两种方法：querySelectorAll()和getElementsByTagName

    - 我们选择后者，因为前者返回值是nodelist，是一个静态集合，不受DOM树元素变化的影响。后者返回的是HTMLCollection，其是一个动态集合，会随着DOM树元素的增加而增加。（如果使用前者，那每次都要手动获取当前新的结点列表重新调用querySelectorAll()）

    - ```tsx
      document.querySelector('#snake').getElementsByTagName('div')
      ```

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

  因为要判断蛇是否和食物发生碰撞，所以获取蛇头的位置很重要

  - **获取蛇头x轴坐标**

  - **获取蛇头y轴坐标**

  - **setX + setY**设置蛇头的坐标，移动页面上的蛇头

  - **addBody**和食物发生碰撞后，身体要增加一个div

    - <u>*要获取外层snake元素，利用它尾部新增一个div元素*</u>
    - 往element元素的结束标签之前添加一个div**使用insertAdjacentHTML("beforeend","\<div>\</div>)"**（方便）
    - addbody不用考虑新div的坐标，因为紧接着就会执行movebody方法，让后面的元素获取前一个元素的坐标

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

- ##### 问题：设置蛇头坐标方法不完善（会越界）+ 只控制蛇头的移动

  - moveBody( )：蛇身bodies每一个方块都要一起动


## 6.GameControl键盘事件

- #### 新建一个控制类GameControl

  - 需要一个总的类将这三个类整合起来，控制游戏里所有的东西，所有类

  - ***因为整个游戏的运行需要所有不同类的配合，集合它们写在一个类，封装起来也是为了方便维护着想***

  - 先在这个类文件中引入其他所有类，入口文件中只用引入这个类并且实例化


- ### 属性

  - 实例化基本类并存储为属性
  - **this.direction**：存储按下的按键作为蛇的移动方向
    - 为什么要存储：因为蛇本来就是自己会移动的，按下按键不是让蛇运动，而是改变蛇运动的方向！

- ### 方法：

  - **游戏初始化init( )**，调用后代表游戏开始

    - 可以直接在gamecontronl的构造函数中调用这个方法

    - 初始化要做的事情就是**绑定键盘事件**，鼠标按下可以操作蛇的方向

    - ```tsx
      init(){
      	document.addEventListener('keydown',this.keydownHandler)
      }
      ```
      

  - ##### keydownHandler（事件回调函数命名习惯）

    - 业务逻辑过多的时候，回调函数最好不要直接写function，因为直接写字面量，不便于维护，不好找。最好把这个回调函数直接设置为类的一个方法。
  
    - ```tsx
      keydownHandler=(event:KeyboardEvent)=>{
          //事件对象event可以用于获取事件相关信息，比如键盘事件是谁触发的。（类型是KeyboardEvent）
          //将蛇移动方向赋值为对应的按键
          //ps：IE浏览器的方向键为Up/Down/...而不是ArrowUp/...
          if(event.key === 'ArrowUp' / 'ArrowDown' /...(伪代码)){
            return
          }
        this.direction = event.key
      }
    
  - ##### 为什么要用箭头函数？
  
    - 这里的回调函数应该使用的是箭头函数，这样才能让回调函数中的this指向gamecontrol的对象（才能使用this.direction）。普通函数的this~~指向当前作用域~~会指向document。
  
      - 因为是谁调用，this指向谁。***键盘事件是给document绑定的，所以被触发后相当于被document调用了（事件给谁绑定的，该事件回调中的this就指向谁）***
  
      - ~~我的天一群人说箭头函数，之前老师配置webpack的时候设置了不编译箭头函数，你设置箭头函数打包压缩后代码也是普通函数~~（是可以使用箭头函数的，是不编译为箭头函数，意思是把箭头函数转换为了其它低版本浏览器能够兼容的语法来实现）
  
    - ##### 也可以不使用箭头函数用bind
  
      ```tsx
      //另一个解决办法--当初绑定事件的时候就把正确的this(当前对象)通过bind传递给回调函数
      document.addEventListener('keydown',this.keydownHandler.bind(this))
    ```
    
    - **这里只能用bind，因为这里传的是回调函数，用apply和call绑定会直接执行方法，而bind是返回一个函数**

## 7.GameControl使蛇移动

- ### 蛇头移动方法run()：

  - ##### 根据方向direction来修改坐标	

    - 应该使用switch来作开关，因为是固定的4个值

    - 为了兼容IE浏览器的Up/...，可以如下

    - ```tsx
      case "Up":
      case "ArrowUp":
      	break;
      ```

  - ##### 获取坐标修改后重新赋值给蛇 VS 直接修改蛇的坐标

    - ```tsx
      case 'ArrowUp':
      	this.snake.Y = (this.snake.Y - 10) >= 0 ? (this.snake.Y - 10) : 290
      	break;
      //获取修改
      case 'ArrowUp':
      	Y = (Y - 10) >= 0 ? (Y - 10) : 290
      	break;
      ```

    - 前者更加简洁，而且还有判断的余地，如果下一步会报错（比如撞墙撞自己，就及时抛出错误不修改蛇头坐标）

  - ##### 调用位置

    - 应该在init初始化的时候就调用，这样游戏一开始蛇头就会运动
      - this.direction需要一个初始值

  - ##### 持续调用

    - 老师实现持续移动的方式，是在***run这个方法中调用了延时函数，延时函数的回调是run本身***，所以就无限循环下去

    - ***注意run的this指向***：run方法中调用自己的this指向问题

      - ![image-20230623112925787](E:\porn\Vue\TypeScript_learning\chap5_项目练习\img\image-20230623112925787.png) 

      - 第一次调用：this.run()是当前实例对象调用的

      - 第二次调用：延时函数中的回调this.run，注意这里没有加()，不是实例对象调用的，而是延时函数触发后由window调用了该对象身上的方法

      - 第三次调用会失败，因为此时this已经指向window，window身上没有run这个方法

      - **解决**：使用bind传递this指向

      - ```tsx
        setTimeout(this.run.bind(this), this.time)
        ```

    - 我原先持续调用是使用定时器，可以，但是不方便

  - **升级加速**：升级后移动速度加快，可以对属性time作手脚，也可以直接在延时器里运算

    - ```tsx
      setTimeout(this.run.bind(this), this.time - (this.scorePanel.level - 1) * 30)
      ```

  - **不可以撞墙**/撞自己，否则游戏结束

    - 所以要有一个变量记录蛇是否死亡，这样方便停止延时器运行

    - ```tsx
      this.isLive && setTimeout(···)
      ```

    - 当isLive为true时(蛇还活着)，才进行后面的延时器。蛇设置为false后，就不动了


## 8.蛇撞墙+吃食检测

蛇撞墙死亡只和蛇自己有关，所以撞墙检测应该写在snake类中

- ##### 避免坐标的多余修改

  - 蛇移动的run方法中，因为可以任意修改移动的方向，所以不管是蛇的x轴还是y轴坐标都会重新赋值，但是对于没有修改的轴坐标重新赋值是多余的，毕竟每次修改只会修改其中一个方向的坐标，所以需要避免无用的赋值

  - ```tsx
    //set 坐标方法内
    if (this.Y === value) {
        return
    }
    ```
    

- ##### 蛇撞墙

  - 最简单的做法可以抛出异常，程序终止

    - ```tsx
      //set 坐标方法内
      if(value <0|| value>290){
          throw new Error("蛇撞墙了");
      }
      ```

    - 程序终止这样子根本不会把非法值赋值给蛇坐标，蛇不会越界


  - 但是直接抛出错误对用户不友好，这个时候可以对异常可能产生的代码使用**try-catch**包裹，**这样就不会报错，也不会导致程序的终止，可以对错误进行处理**

    - ```tsx
      try {
          this.snake.X = X
          this.snake.Y = Y
      } catch (e: any) {
          alert(e.message + 'GAME OVER')
          this.isLive = false
      }
      ```

- ##### 吃食物检测

  - 因为是蛇和食物两个类的交流，所以放到gamecontrol中定义单独的方法

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


## 9.身体移动

- 需要解决的问题：蛇的身体移动，身体碰撞，掉头

- #### **蛇的身体移动movebody方法**：
  
  - 只涉及到蛇，所以写在蛇类中
  
  - **思路**：一个个修改body元素的坐标为前一个元素的坐标，但是要**从后往前改**，这样才能获取到它们原来的坐标
  
  - ```tsx
    moveBody() {
        let behind, front
        for (let i = this.bodies.length - 1; i > 0; i--) {
            behind = <HTMLElement>this.bodies[i]           //强制类型转换
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
                        X = (this.bodies[i - 1] as HTMLElement).offsetLeft        //类型断言
                        Y = (this.bodies[i - 1] as HTMLElement).offsetTop
                        behind = (this.bodies[i] as HTMLElement)
                        behind.style.left = X + 'px'
                        behind.style.top = Y + 'px'
                    }
                }
    ```
  
  - **报错：ts中的Element如果不存在某个属性**（使用类型断言）

    - ***HTMLCollection里面的类型是Element，Element是一个接口，HTMLElement是一个子接口，明确这个Element可以是一个HTMLElement，所以要做一个类型断言告诉他就是一个HTMLElement***
    - `this.bodies[i] as HTMLElement`
  
- #### **蛇不能掉头**

  - ##### 键盘事件中判断方向

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

      - 不过理论上来说只有蛇头应该也不允许掉头（去掉second的判断即可）

  - **老师方法：**在set X/Y( )中分别判断蛇头的x/y坐标是否和第二节坐标一样即可（在蛇头坐标真的修改为第二节坐标之前判断）

    - 要注意一开始只有一个蛇头的情况

    - 发生掉头后direction已经被修改，怎么按照原来的方向继续前进？让蛇一直往反方向移动

    - ```tsx
      if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
          console.log('水平方向发生了掉头')
          if(value > this.X){
              value = this.X -10
          }else{
              value = this.X +10
          }
      }
      //垂直方向类似
      ```

- #### 身体碰撞

  - 我的方法：在持续执行的run运动函数中**得到新值之后，蛇头被赋值之前的try-catch里**

    - ```tsx
      for (let i = 1; i < this.snake.bodies.length; i++) {
          let item = this.snake.bodies[i] as HTMLElement
          if (X === item.offsetLeft && Y === item.offsetTop) {
              throw new Error("蛇撞到身体了");
          }
      }
      ```
    
  - **老师还是按照谁的功能就写到哪个类里的规范checkHeadBody()**：在snake中检查蛇头和每一截身体的坐标是否重叠(和我逻辑一样)

    - 在X/Y轴的set函数中调用该方法，因为gamecontrol中已经对坐标赋值用try-catch包裹了，所以抛出异常就完事
