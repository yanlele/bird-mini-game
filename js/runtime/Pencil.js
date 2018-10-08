/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-08 22:41
 */
import {Director} from "../Director.js";

export class Pencil extends Sprite{
    constructor(image, top) {
        super(image,
            0,0,
            image.width, image.height,
            window.innerWidth, 0,
            image.width, image.height);
    }

    draw() {
        this.x = this.x - Director.getInstance().landSpeed;
        super.draw(this.img,
            0,0,this.width, this.height,
            this.x, this.y, this.width, this.height)
    }
}