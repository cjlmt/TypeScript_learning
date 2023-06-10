(function () {
    //定义一个表示人的类
    class Person {
        private _name: string
        private age: number
        constructor(name: string, age: number) {
            this._name = name
            this.age = age
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
            return this._name
        }
    }
    const per = new Person('peiqi', 18)
    // console.log(per.getName());
    // per.setName('123')
    // console.log(per.getName());
    class Tes {
        private age: number
        constructor(age: number) {
            this.age = age
        }
    }
    class Tes2 extends Tes {

    }
    const test = new Tes2(18)
    console.log(test);

    class A {
        constructor(public name: string) {

        }
    }

})()