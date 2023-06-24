class Snake {
    head: HTMLElement;

    //getElementsByTagName返回的是一个HTML元素集合
    bodies: HTMLCollection;

    //要用到抽象的snake盒子用于添加div
    element: HTMLElement;

    //记录下一次运动前bodies的坐标
    record: Array<number> = []

    constructor() {
        this.element = document.querySelector('.snake')!
        this.head = document.querySelector('.snake div')!
        this.bodies = this.element.getElementsByTagName('div')
    }

    //获取蛇头的x轴坐标
    get X() {
        return this.head.offsetLeft
    }

    //获取蛇头的y轴坐标
    get Y() {
        return this.head.offsetTop
    }

    //设置蛇头的x轴坐标，移动页面上的蛇头位置
    set X(value) {
        //如果新值和旧值相同，则没有必要更改，节省性能
        if (this.X === value) {
            return
        }
        //如果撞球则抛出错误
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }
        this.head.style.left = value + 'px'
    }

    //设置蛇头的y轴坐标
    set Y(value) {
        if (this.Y === value) {
            return
        }
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }
        this.head.style.top = value + 'px'
    }

    //给snake添加一个div元素
    addBody() {
        this.element.insertAdjacentHTML("beforeend", `<div></div>`)
    }

    //添加一个蛇身体移动的方法：遍历身体的每一节(除了蛇头)，从最后一个开始，给其赋值前一截身体的坐标
    moveBody() {
        let X: number
        let Y: number
        let behind
        for (let i = this.bodies.length - 1; i > 0; i--) {
            X = (this.bodies[i - 1] as HTMLElement).offsetLeft
            Y = (this.bodies[i - 1] as HTMLElement).offsetTop
            behind = (this.bodies[i] as HTMLElement)
            behind.style.left = X + 'px'
            behind.style.top = Y + 'px'
        }
    }
}
export default Snake