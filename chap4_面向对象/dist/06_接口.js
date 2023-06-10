"use strict";
class Proto {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    sayHi() {
        console.log('hello');
    }
}
const proto = new Proto('peiqi', 8, 'male');
console.log(proto);
const p = {
    name: '123',
    age: 18,
};
