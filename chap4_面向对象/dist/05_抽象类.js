"use strict";
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
    }
    class Dog extends Animal {
        bark() {
            console.log('fuck');
        }
    }
    const dog = new Dog('旺财');
    dog.bark();
})();
