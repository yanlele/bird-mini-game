/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:16
 */
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        const loader = ResourceLoader.create();
        loader.onLoaded(map=>this.onResourceFirstLoaded(map));

        let image = new Image();
        image.src = '../res/background.png';

        image.onload = ()=> {
            this.ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.width,
                0,
                0,
                image.width,
                image.height
            )
        }
    }

    onResourceFirstLoaded(map) {
        console.log(map)
    }
}