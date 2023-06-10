"use strict";
// 使用关键字class
class student {
    constructor() {
        //1定义属性
        //1.1定义实例属性
        this.name = 'atguigu';
        this['age'] = 18;
        //1.3定义只读属性
        this.height = 178;
    }
    //2定义方法
    //2.1定义实例方法
    sayHi() {
        console.log('Hello');
    }
    // 2.2定义类方法/静态方法
    static sayBye() {
        console.log('GoodBye');
    }
}
//1.2定义静态属性/类属性
student.gender = 'male';
student.weight = 75;
let hk = new student();
console.log(hk);
console.log(student.gender);
console.log(student.weight);
hk.sayHi();
student.sayBye();
