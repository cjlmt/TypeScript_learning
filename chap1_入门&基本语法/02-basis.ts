let a: number
//指定类型后就只能存该类型的值
a = 10
a = 33

let b: string

b = 'hello'

let c: boolean = true

let d = true
//声明同时赋值会类型判断，定死类型
// d = 'hello'

let e
//不会类型判断
e = 20
e = 'hello'