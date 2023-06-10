"use strict";
(function () {
    //定义一个表示人的类
    class Person {
        constructor(name, age) {
            this._name = name;
            this.age = age;
        }
        // //定义方法，获取name属性
        // getName() {
        //     return this.name
        // }
        // //定义方法，设置name属性
        // setName(val: string) {
        //     this.name = val
        // }
        //
        get name() {
            return this._name;
        }
    }
    const per = new Person('peiqi', 18);
    // console.log(per.getName());
    // per.setName('123')
    // console.log(per.getName());
    class Tes {
        constructor(age) {
            this.age = age;
        }
    }
    class Tes2 extends Tes {
    }
    const test = new Tes2(18);
    console.log(test);
})();
