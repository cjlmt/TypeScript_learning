class Dog {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    bark() {
        console.log('汪汪汪');
    }
}

const dog = new Dog('bicth', 18)
console.log(dog);
dog.bark()