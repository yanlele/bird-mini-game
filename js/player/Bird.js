/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:12
 * 循环渲染图片的是三个部分
 */
import {Sprite} from "../base/Sprite.js";

// 小鸟类
export class Bird extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image,
            0, 0, image.width, image.height,
            0, 0, image.width, image.height);


        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
        this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 34 + 18 + 18];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34,34,34];
        this.clippingHeight = [24,24,24];

        this.birdX = window.innerWidth/4;
        this.birdsX = [this.birdX, this.birdX, this.birdX];
        this.birdY = window.innerHeight/2;
        this.birdsY = [this.birdY, this.birdY,this.birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.y = [this.birdY, this.birdY, this.birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }


    draw() {
        // 切换三只小鸟的速度
        const speed = 1;
        this.count = this.count + speed;
        if(this.index >= 2) {
            this.count = 0;
        }
        this.index = this.count;
        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );
    }
}