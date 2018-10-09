/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:15
 */
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for(let i = 0;i<=2;i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    // 判断小鸟装机地板和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');

        // 地板的装机判断
        if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            this.isGameOver = true;
            console.log('撞击地板');
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
            }

            if(pencils[0].x<=(window.innerWidth - pencils[0].width)/2 && pencils.length === 2) {
                this.createPencil()
            }

            this.dataStore.get('pencils').forEach(function(value) {
                value.draw();
            });

            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());        // 循环执行
            this.dataStore.put('timer', timer);
            // cancelAnimationFrame(this.dataStore.get('timer'));          // 这个函数可以终止动画循环
        } else {
            console.log('游戏结束');
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }

    }
}