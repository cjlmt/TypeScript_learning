//定义食物类Food
class Food {

    //食物的页面元素
    element: HTMLElement;

    constructor() {
        this.element = document.querySelector('.food')!
    }

    //获取食物的x轴坐标
    get X() {
        return this.element.offsetLeft
    }

    //获取食物的y轴坐标
    get Y() {
        return this.element.offsetTop
    }

    //改变食物的坐标以改变页面上食物的位置
    change() {
        const newX = Math.floor(Math.random() * 30) * 10
        const newY = Math.floor(Math.random() * 30) * 10
        this.element.style.left = newX + 'px'
        this.element.style.top = newY + 'px'
    }
}

export default Food;