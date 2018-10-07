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

        Director.getInstance();
    }

    onResourceFirstLoaded(map) {
        console.log(map)
    }
}