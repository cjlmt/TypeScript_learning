interface classTemplate {
    name: string
    age: number
    sayHi(): void
}
class Proto implements classTemplate {
    name: string
    age: number
    gender: string
    constructor(name: string, age: number, gender: string) {
        this.name = name
        this.age = age
        this.gender = gender
    }
    sayHi(): void {
        console.log('hello');
    }
}
const proto = new Proto('peiqi', 8, 'male')
console.log(proto);

interface inter {
    name: string
    age: number
}
const p: inter = {
    name: '123',
    age: 18,
}
