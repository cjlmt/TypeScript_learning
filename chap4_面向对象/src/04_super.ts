(function () {
    class Animal {
        name: string
        constructor(name: string) {
            this.name = name
        }
        sayHello() {
            console.log('Hello');
        }
    }
    class Dog extends Animal {
        type: string
        constructor(type: string, name: string) {
            super(name)
            this.type = type
        }
        sayHello(): void {
            console.log('Bark');
        }
    }
    const dog = new Dog('旺财', '哈士奇')
    console.log(dog);
    dog.sayHello()

})()