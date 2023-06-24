import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"
class GameControl {

    // 蛇对象
    snake: Snake

    //食物对象
    food: Food

    //记分牌对象
    scorePanel: ScorePanel

    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = 'ArrowDown'

    //延时器时间间隔，控制蛇头多久移动一次，默认300ms移动一次
    time: number

    // 创建一个属性 用来记录游戏是否结束，如果结束就停止run移动函数的运行
    isLive = true

    constructor(time: number = 300) {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 5)
        // 自定义升级的速度
        this.time = time
        this.init()
    }

    //游戏初始化函数，实例该类则调用，代表游戏开始
    init() {
        document.addEventListener('keydown', this.keyEventHandler)
        this.food.change()
        //游戏开始直接调用run方法，并且循环调用下去
        this.run()
    }

    //监听键盘事件（上下左右）的回调函数，作用是及时改变蛇运动的方向direction
    keyEventHandler = (event: KeyboardEvent) => {

        //临时发挥的游戏暂停
        if (event.key === 's') {
            this.isLive = this.isLive === true ? false : true
            if (this.isLive) {
                this.run()
            }
        }

        //检测按键是否合法
        if (!(event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowUp')) {
            return
        }

        //实现禁止掉头代码
        if (this.direction === 'ArrowUp' && event.key === 'ArrowDown') {
            return
        } else if (this.direction === 'ArrowLeft' && event.key === 'ArrowRight') {
            return
        } else if (this.direction === 'ArrowRight' && event.key === 'ArrowLeft') {
            return
        } else if (this.direction === 'ArrowDown' && event.key === 'ArrowUp') {
            return
        }
        this.direction = event.key
    }

    // 蛇头移动方法
    run() {
        let X = this.snake.X
        let Y = this.snake.Y
        //先获取，修改，再赋值 更加简便和灵活

        //根据运动方向，修改蛇头的坐标
        switch (this.direction) {
            case 'ArrowDown':
                Y += 10
                break;
            case 'ArrowRight':
                X += 10
                break;
            case 'ArrowLeft':
                X -= 10
                break;
            case 'ArrowUp':
                Y -= 10
                break;
            default:
                break;
        }

        //检测修改后的蛇头坐标(此时蛇头未移动)是否碰撞食物，如果碰撞则添加一个默认div元素
        this.checkEat(X, Y)
        //更新每一节身体的坐标，此时蛇头还没移动
        this.snake.moveBody()

        // 判断蛇头会不会碰撞到身体或者撞到墙，会则抛出错误暂停游戏，蛇不再运行
        //不会则及时更新蛇头的位置
        try {
            for (let i = 1; i < this.snake.bodies.length; i++) {
                let item = this.snake.bodies[i] as HTMLElement
                if (X === item.offsetLeft && Y === item.offsetTop) {
                    throw new Error("蛇撞到身体了");
                }
            }
            this.snake.X = X
            this.snake.Y = Y
        } catch (e: any) {
            alert(e.message + 'GAME OVER')
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), this.time - (this.scorePanel.level - 1) * 30)
    }

    //检测蛇是否吃到食物，迟到则修改食物的位置，加分升级，加长身体
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}
export default GameControl