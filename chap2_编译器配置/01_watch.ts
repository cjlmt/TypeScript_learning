console.log(123);

function func(a: number, b: number): number {
    return a + b
}

function func2(this: any) {
    alert(this)
}

func2()