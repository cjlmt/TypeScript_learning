let str: string
str = 'hello'

let num: number
num = 1

let range: 1 | 2 | 3
range = 1
range = 2
range = 3
// range = 5

let typerange: boolean | number
typerange = 123
typerange = false
// typerange = 'hello'

let extravar: 10
// extravar = 20

let a: any
a = 10
str = a

let un: unknown
un = 10
//str = un
if (typeof un === 'string') {
    str = un
}

let un2: unknown
un2 = un

