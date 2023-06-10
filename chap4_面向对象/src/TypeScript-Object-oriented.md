# 第二章：面向对象

面向对象是程序中一个非常重要的思想，js就是一门面向对象的语言。面向对象简而言之就是程序之中**【所有的操作都需要通过对象来完成】**。

- 比如：
  - 操作浏览器要使用**window对象(浏览器窗口)**
  - 操作网页要使用**document对象**
  - 操作控制台要使用**console对象**

一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机<u>程序的本质就是对现实事物的抽象</u>，抽象的反义词是具体**一个实物在程序中就是一个对象**。**对抽象的一个具体化就是一个对象，对一个对象进行操作的过程就是面向对象**

在程序中所有的对象都被分成了两个部分数据（属性）和功能（方法）在程序中一切皆是对象（任何事物都可以分为属性和方法）。

## 1、类（class）

对象的模型/抽象(对象长什么样)，可以**通过一个定义好的类来** **【创建对象】**，不同的类可以用来创建不同的对象。

ts的类和js中的类大同小异

- ### 定义类：

  - #### 定义实例属性/类属性(静态属性)/只读属性

    - 实例属性：实例化的对象才会有的属性，***通过对象来访问***
    - 类属性：属性前加上**static关键字**声明的就是类属性，不需要创建对象就可以用的属性，***通过类来访问***
    - 只读属性：在属性定义前加**readonly关键字**声明的属性**不能在实例之后被二次赋值**
      - **可以声明只读的类属性**

  - #### 定义实例方法/类方法(静态方法)

    - 实例方法：和普通函数的声明一样，通过对象名调用
    - 类方法：和类属性一样在实例方法前面加static关键字，通过类名调用，用的少

  - #### 构造函数

    - 可以实例化不同的对象，如果**不能创建自定义的对象，那这个类就没有意义**
    - **使用constructor函数进行对象的自定义，构造函数会在对象创建时调用（new Dog()时立即执行constructor函数）**
    - 实例方法和构造函数中的this表示当前调用该方法的实例/对象，通过传入不同的参数来给实例属性赋不同的值（**要事先定义这个实例属性才可以通过constructor自定义赋值，若干定义时没有初始化也没有在构造函数中赋值会报错**）
    
  - ```typescript
    class 类名 {
        //定义属性
    	/*属性名: 类型;（也可以直接给初始值）*/
        name: string = 'atguigu';
        age: number;
        
        //只读属性
        readonly height: number = 178;
        
        //静态属性
        static  gender: string;
    	
    	constructor(参数: 类型){
    		this.属性名 = 参数;
    	}
    	
    	/*定义方法：
    	方法名(){
    		....
    	}*/
        sayHello(){
            console.log('hello')
        }
        
        //定义静态方法
        static sayBye(){
            console.log('goodBye')
        }
    
    }
    ```
  
    - **如果不赋初值要给属性名加引号**
  
- 示例：

  - ```typescript
    class Person{
        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        }
    
    }
    ```

- 使用类：

  - ```typescript
    const p = new Person('孙悟空', 18);
    p.sayHello();
    ```

## 2、面向对象的特点（封装继承多态）

### 封装

- 对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装

  - #### **[作用：采用修饰符，属性存取器等举措，让属性更加安全]()**

- 默认情况下，**对象的属性是可以任意的修改的，为了确保【数据的安全性】，在TS中可以对属性的权限进行设置（比如钱就是敏感数据）**

- **TS中属性具有三种修饰符**：

  - **public（默认值）**，可以在**类、子类和对象**中修改。**[公共属性可以在任意位置修改和访问]()**
  - **protected** ，可以在类、子类中修改。**[父类定义为protected的属性继承给我后，我也可以修改和访问]()**
  - **private** ，可以在类中修改。[**私有属性只能在(父)类内部被修改和访问，*子类有但是不能修改不能访问*（只有我可以管教自己的孩子）**]()

    - #### `可以在类中添加方法使得私有属性可以被外部间接访问，前提是这个属性不受从父类继承来的，而是当前类里声明的`
    - ```tsx
      //间接访问和修改属性
      //定义方法，获取name属性
      getName() {
          return this.name
      }
      //定义方法，设置name属性
      setName(val: string) {
          this.name = val
      }
      ```

- ##### 如何解决安全性问题：

  - 采用private修饰符后，能否读取和修改该属性的主动权在于我设不设置get和set函数（属性存取器）。
    - <u>*属性容易被修改错，容易产生安全性问题才需要用属性存取器，否则简单的数据没必要*</u>

  - 可以**在set函数中进行逻辑判断，如果数据不合法则不能修改** 

- ##### 注意：

  - 这些修饰符在js中是没有的，最好开启报错不编译，否则在js中任何属性都是可以修改和访问的

- 示例：

  - public

    - ```typescript
      class Person{
          public name: string; // 写或什么都不写都是public
          public age: number;
      
          constructor(name: string, age: number){
              this.name = name; // 可以在类中修改
              this.age = age;
          }
      
          sayHello(){
              console.log(`大家好，我是${this.name}`);
          }
      }
      
      class Employee extends Person{
          constructor(name: string, age: number){
              super(name, age);
              this.name = name; //子类中可以修改
          }
      }
      
      const p = new Person('孙悟空', 18);
      p.name = '猪八戒';// 可以通过对象修改
      ```

  - protected

    - ```typescript
      class Person{
          protected name: string;
          protected age: number;
      
          constructor(name: string, age: number){
              this.name = name; // 可以修改
              this.age = age;
          }
      
          sayHello(){
              console.log(`大家好，我是${this.name}`);
          }
      }
      
      class Employee extends Person{
      
          constructor(name: string, age: number){
              super(name, age);
              this.name = name; //子类中可以修改
          }
      }
      
      const p = new Person('孙悟空', 18);
      p.name = '猪八戒';// 不能修改
      ```

  - private

    - ```typescript
      class Person{
          private name: string;
          private age: number;
      
          constructor(name: string, age: number){
              this.name = name; // 可以修改
              this.age = age;
          }
      
          sayHello(){
              console.log(`大家好，我是${this.name}`);
          }
      }
      
      class Employee extends Person{
      
          constructor(name: string, age: number){
              super(name, age);
              this.name = name; //子类中不能修改
          }
      }
      
      const p = new Person('孙悟空', 18);
      p.name = '猪八戒';// 不能修改
      ```

- 属性存取器

  - 对于一些不希望被任意修改的属性，可以将其设置为private

  - 直接将其设置为private将导致无法再通过对象修改其中的属性

  - 我们可以在类中定义一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器

  - 读取属性的方法叫做setter方法，设置属性的方法叫做getter方法

  - 示例：

    - ```typescript
      class Person{
          private _name: string;
      
          constructor(name: string){
              this._name = name;
          }
      
          get name(){
              return this._name;
          }
      
          set name(name: string){
              this._name = name;
          }
      
      }
      
      const p1 = new Person('孙悟空');
      console.log(p1.name); // 通过getter读取name属性
      p1.name = '猪八戒'; // 通过setter修改name属性
      ```

  - ### 属性存取器的另一种更加灵活的写法

    - 使用命名**约定**，将私有属性的变量名前加下划线，以在get set区分它们

    - ```tsx
      get name(){
          return this._name
      }
      per.name
      //不是访问name属性，而是调用上面的get方法
      //其实不一定要用name，可以自定义，只不过是一种约定
      set name(value: string){
          this._name = value
      }
      //修改的使用也是以前的改法，可以自动将=后面的值作为set函数的参数
      per.name = '123'
      ```

    - ##### 好处就是：不改变从前的使用习惯（直接.xxx来访问属性），但实际上还是通过了属性存取器

### 继承

- **两个类的结构基本上非常相似的时候，为了防止代码冗余可以采用类的继承-extends**

  - 把**公共的代码提取到一个公共类上进行共享**，比如animal

- 通过继承*<u>**可以将其他类中的属性和方法(包括静态属性方法)引入到当前类中**</u>*，*<u>通过继承可以在不修改类的情况下完成对类的扩展</u>*

  - 示例：

    - ```typescript
      class Animal{
          name: string;
          age: number;
      
          constructor(name: string, age: number){
              this.name = name;
              this.age = age;
          }
      }
      
      //使Dog类继承Animal类，Animal被称为父类，Dog被称为子类
      //子类拥有父类所有的方法和属性
      class Dog extends Animal{
      
          bark(){
              console.log(`${this.name}在汪汪叫！`);
          }
      }
      
      const dog = new Dog('旺财', 4);
      dog.bark();
      ```

- #### 重写（override）

  - **方法的重写：子类中的方法替换掉父类中的同名方法**

    - ##### `原理：方法从原型链上找，在Cat构造函数的原型对象上就找到了这个方法，就不会跑到父类Animal构造函数的原型对象上找`

    - 也**可以直接增加父类没有的属性和方法**

  - OCP原则：对扩展开发，对修改关闭

    - 如果需要用到别人给的一个类，但是缺少一个功能，可以自己创建一个类继承该类，并添加功能。此后就可以使用该新类继承。（不修改原来类的基础上对类进行扩展）

  - 示例：

    - ```typescript
      class Animal{
          name: string;
          age: number;
      
          constructor(name: string, age: number){
              this.name = name;
              this.age = age;
          }
      
          run(){
              console.log(`父类中的run方法！`);
          }
      }
      
      class Dog extends Animal{
      
          bark(){
              console.log(`${this.name}在汪汪叫！`);
          }
      
          run(){
              console.log(`子类中的run方法，会重写父类中的run方法！`);
          }
      }
      
      const dog = new Dog('旺财', 4);
      dog.bark();
      ```

- ### super

  - 在子类中可以使用super来完成对父类(也叫超类)的引用，**【*[子类的方法中]()*，super就是当前类继承的父类】**

  - ```tsx
    sayHello(){
        super.sayHello()
    }
    ```

  - ##### 使用场景：子类想添加一个age属性，要重写构造函数

    - 定义好要对属性进行初始化-constructor

    - **[【子类的构造函数中必须调用父类的构造函数super()，并且要在使用this前调用super()】]()**

    - 默认情况自动调用了super()

    - ```tsx
      constructor(type: string, name: string) {
          super(name)   //调用父类的构造函数
          this.type = type
      }
      ```

- ### 抽象类（abstract class）

  - **【它只能[被其他类所继承不能用来创建实例]()】**

    - 抽象类的意义就是<u>专门用来被其他类用来继承的，毕竟创建自己的实例没有意义</u>

    - 使用abstract能禁止别人用于创建对象

  - ```typescript
    abstract class Animal{
        abstract run(): void;
        bark(){
            console.log('动物在叫~');
        }
    }
    
    class Dog extends Animals{
        run(){
            console.log('狗在跑~');
        }
    }
    ```

  - 使用**abstract开头的方法叫做抽象方法**，**[抽象类当中才可以添加抽象方法]()**！

    - **抽象方法没有方法体只能定义在抽象类中**：抽象类中定义抽象方法
      - 【无法实例化的类中，需要被子类重写的方法的方法体的存在是没有意义的（通用方法不能满足每个类的需求时）】
      - **[父类定义方法的结构，子类定义方法的具体实现]()**

    - **继承抽象类时抽象方法必须要实现**：继承类中编写抽象方法
    - 抽象方法的定义要有***限定返回值类型***




## 3、接口（Interface）

- ### 接口是什么

  - 接口实际上就是一个规范/标准，和抽象类不一样，抽象类是方便我们的编写，但接口作为规范并不能方便我们编写代码（甚至更加麻烦），实现了我这个接口才满足了规范。
  - 接口的写法看起来和抽象类相似，但是其实有很多不同：
    - 实现接口并不是像继承那样，继承后的类就有了父类中的属性和实例方法类方法。要实现接口的类只是**被强制要求要手动定义接口中的属性和方法**
    - 抽象类可以写类方法，实例方法和没有方法体的抽象方法，属性需要被赋值初始化。但**接口中的所有方法和属性都是没有实值的（方法都是抽象方法）**
    - 接口可以当成一个自定义类型来使用（和type关键字功能一样）
  - **接口主要负责定义一个类的结构（至少应该要包含哪些属性和方法）**

- ### 接口的作用

  - #### 作为一个数据类型，对对象的结构进行限制

    - ```tsx
      //1.自定义类型：描述一个对象的类型
      type myType = {
          name: string,
          age: number
      }
      //2.接口也可以对对象的类型做了限制，类的属性有name和sayHello
      interface Animal{
          name: string
          gender: string
      }
      //定义好的接口可以直接作为一种数据类型来使用
      const obj: Animal = {
          name : 'hello'
          gender : 'male'
      }
      ```

  - #### 让类去实现接口，实现接口时类中要保护接口中的所有属性

    - **实现接口的意思是--- 使类满足接口的要求**

    - **【如何实现接口】：先定义代表特定规范的接口；使用implements关键字(实现)定义类，手动声明规范所要求的属性和方法**

    - ```tsx
      //接口类似，用于定义一个类/对象的结构，应该包含哪些属性和方法
      interface myInter{
          name: string
          sayHello(): void
      }
      //定义类时，可以使类去实现一个接口
      class inter implements myInter{
          name: string
          constructor(name: string){
              this.name = name
          }
          sayHello(){
      		console.log('hello')
          }
      }
      ```

    - 意义：接口可以在定义类的时候限制类的结构，为的就是这种被限制的满足规范的类可以在特定使用场景中使用（比如打枪用到的枪支对象需要包括枪口，扳机，倍镜，弹匣这些零件，但是这些成员的值不受限制，比如这些零件的型号是什么）

  - #### 可以限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。

    - 实现了接口的类实例化的对象就是能匹配接口的对象；其实本质还是把接口当作一种类型（也可以说规范）

    - ```tsx
      //（检查对象类型）
      interface Person{
          name: string;
          sayHello():void;
      }
      
      function fn(per: Person){
          per.sayHello();
      }
      
      fn({name:'孙悟空', sayHello() {console.log(`Hello, 我是 ${this.name}`)}});
      ```

- ### 注意

  - **可以重复声明同名接口**，因为定义的是同一个接口，不会覆盖，接口最终汇总每次定义的属性和方法

    - ```tsx
      interface Animal{
          name: string
          gender: string
      }
      interface Animal{
          age: number
      }
      const obj: Animal = {
          name : 'hello'
          gender : 'male'
          age : 18
      }
      ```

  - #### [定义类时，属性声明的另一种方式]()

    - ##### 属性不一定要先声明，再通过构造函数赋值。[直接将属性定义在构造函数中]()，简便很多

    - ```typescript
      interface Person{
          name: string;
          sayHello():void;
      }
      
      class Student implements Person{
          //不声明，直接在构造函数中声明全局属性
          constructor(public name: string) {
          }
      
          sayHello() {
              console.log('大家好，我是'+this.name);
          }
      }
      ```

  - #### 类在实现接口的基础上（满足规范的前提下），可以扩展声明其他属性。

    - **【因为实现接口只是要求你满足其要求，并没有禁止你声明其余属性】**
    - 但如果是把接口作为一种类型进行声明变量或对象匹配接口时要严格满足



## 4、泛型（Generic）

**定义一个函数或类时**，有些情况下**无法确定其中要使用的具体类型**（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

类型不明确的时候，泛型就是一个变量存储传入参数的类型

- 举个例子：

  - ```typescript
    function test(arg: any): any{
    	return arg;
    }
    ```

  - 上例中，test函数有一个参数类型不确定，但是能确定的时其返回值的类型和参数的类型是相同的，由于类型不确定所以参数和返回值均使用了any，**（可以解决问题）但是很明显这样做是不合适的**，首先使用any会**关闭TS的类型检查**，其次这样设置也**不能体现出参数和返回值是相同的类型**

  - ##### 使用泛型：

  - ```typescript
    function test<T>(arg: T): T{
    	return arg;
    }
    ```

  - 这里的```<T>```就是泛型，**T是我们给这个类型起的名字（不一定非叫T）**，**设置泛型后即可在函数中使用T来表示该类型**。所以泛型其实很好理解，就**表示某个类型**。

    - 要先定义了这个泛型才可以使用

  - 那么如何使用上边的函数呢？

    - 方式一**（直接使用）**：
  
      - ```typescript
        test(10)
        ```

      - 使用时可以直接传递参数使用，类型会由**TS自动推断**出来，但有时编译器无法自动推断时还需要使用下面的方式

    - 方式二**（指定类型）**：
  
      - ```typescript
        test<number>(10)
        ```

      - 也可以在**函数后手动指定泛型**

  - 可以**同时指定多个泛型，泛型间使用逗号隔开：**
  
    - ```typescript
      function test<T, K>(a: T, b: K): K{
          return b;
      }
      
      test<number, string>(10, "hello");
      ```

    - 使用泛型时，完全可以将泛型当成是一个普通的类去使用

  - **类中同样可以使用泛型**：
  
    - ```typescript
      class MyClass<T>{
          prop: T;
      
          constructor(prop: T){
              this.prop = prop;
          }
      }
      ```

  - 除此之外，也可以**对泛型的范围进行约束**
  
    - 如果直接写T或者K，泛型的范围就太大了，什么类型都可以。某些情况希望限定泛型的范围
    
    - ```typescript
      interface MyInter{
          length: number;
      }
      
      function test<T extends MyInter>(arg: T): number{
          return arg.length;
      }
      ```
  
    - 使**用T extends MyInter表示泛型T必须是MyInter的子类**，**这里不一定非要使用接口，类和抽象类同样适用**。
    
      - T实现了MyInter这个接口，说明**T也有length这个属性，并且类型为number**。
      - arg:T 说明参数也有length这个属性，而且值要是number
      - ***<u>此时传入的参数必须实现MyInter接口，或者有length这个属性</u>***
    
  



- 抽象类、接口都是typescript里新增的。编译后的js看不到abstract和implements这些字眼
- delegate和try—catch

