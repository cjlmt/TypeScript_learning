class ScorePanel {

    //分数和等级
    score = 0;
    level = 1;

    //分数等级所在的页面元素，可以在这里也可以在构造函数中初始化
    scoreSpan: HTMLElement;
    levelSpan: HTMLElement;

    //最大等级限制
    maxLevel: number

    //多少分升级
    upScore: number

    constructor(maxLevel: number = 10, upScore: number = 10) {
        //如果没有传的话，参数默认值为10
        this.scoreSpan = document.querySelector('#score')!
        this.levelSpan = document.querySelector('#level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    //加分
    addScore() {
        this.score++
        this.scoreSpan.innerHTML = this.score + ''
        if (this.score % this.upScore === 0) {
            this.addLevel()
        }
        if (this.score === 5) {
            document.querySelector('.notice')!.innerHTML = "Wow, you're really good at this"
        }
    }
    //升级
    addLevel() {
        if (this.level < this.maxLevel) {
            this.level++
            this.levelSpan.innerHTML = this.level + ''
        }
    }
}

export default ScorePanel;