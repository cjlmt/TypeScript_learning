(function () {

    //定义公共类
    class Animal {
        name: string
        age: number
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }
        sayHello() {
            console.log('');
        }
        static see: number = 1
    }
    //定义狗类
    class Dog extends Animal {
        sayHello() {
            console.log('barkbarkbark');
        }
    }
    const dog = new Dog('旺财', 18)
    console.log(dog);
    dog.sayHello()

    class Cat extends Animal {
        sayHello(): void {
            console.log('miaomiaomiao');
        }
    }
    const cat = new Cat('咪咪', 10)
    console.log(cat);
    cat.sayHello()

    console.log(Dog.see);
    console.log(Cat.see);

})()