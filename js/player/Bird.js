/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:12
 * 循环渲染图片的是三个部分
 */
import {Sprite} from "../base/Sprite.js";

// 小鸟类
export class Bird extends Sprite{
    constructor() {
        const image = Sprite.getImage('birds');
        super(image,
            0,0,image.width, image.height,
            0,0,image.width, image.height)
    }
}