let a: object
a = {
    name: 'atguigu'
}

let obj: { name: string, age: number }
obj = {
    name: 'atguigu',
    age: 18
}

// &同时满足
let objnew: { name: string } & { age: number }
objnew = {
    name: 'atguigu',
    age: 18
}

let obj1: { name: string, age?: number }
obj1 = { name: 'hello' }

let obj2: { name: string, [propName: string]: any }
obj2 = { name: '123', age: 18 }

let func: (a: number, b: number) => number
func = function (num1, num2) {
    return num1 + num2
}

let arr: number[]
arr = [1, 2, 3, 4]

let arr2: Array<string>
arr2 = ['at', 'gui', 'gu']

//tuple
let tur: [string, number]
tur = ['atguigu', 2]

let numTur: [number, number, number]
numTur = [1, 2, 3]

enum Gender {
    male, female
}

let men: Gender
men = Gender.male

let woman: Gender = Gender.female

let i: { name: string, gender: Gender }
i = {
    name: 'atguigu',
    gender: Gender.male
}
console.log(i.gender === Gender.male);
enum Color {
    Red,
    Green = 2,
    Blue,
}