"use strict";
class Dog {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    bark() {
        console.log('汪汪汪');
    }
}
const dog = new Dog('bicth', 18);
console.log(dog);
dog.bark();
