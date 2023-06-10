"use strict";
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log('Hello');
        }
    }
    class Dog extends Animal {
        constructor(type, name) {
            super(name);
            this.type = type;
        }
        sayHello() {
            console.log('Bark');
        }
    }
    const dog = new Dog('旺财', '哈士奇');
    console.log(dog);
    dog.sayHello();
})();
