function fn(a: any): any {
    return a
}

function fn1<T>(a: T): T {
    return a
}

function fn2<T, K>(a: T, b: K): T {
    return a
}

class classRange {
    name: string
    constructor(name: string) {
        this.name = name
    }
}
function fn3<T extends classRange>(a: T): T {
    return a
}
fn3({ name: '123' })

interface interRange {
    length: number
}
function fn4<T extends interRange>(a: T): T {
    return a
}
fn4('123')
//传入的参数有length这个属性即可