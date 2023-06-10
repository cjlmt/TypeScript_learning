(function () {

    abstract class Animal {
        name: string
        constructor(name: string) {
            this.name = name
        }
        abstract bark(): void
    }
    class Dog extends Animal {
        bark(): void {
            console.log('fuck');
        }
    }
    const dog = new Dog('旺财')
    dog.bark()
})()