/**
 * create by yanlele
 * create time 2018-10-12 13:05
 */

import Store from './Store.js'
import InitTime from "./InitTime.js";
import {ITimeObj} from "./CommonInterface.js"
import Common from './Common.js';

class Main extends InitTime {
    private store: Store = Store.getInstance();
    private common: Common = new Common();
    private timer: number = 0;

    constructor() {
        super();
    }

    // 自动增加时间
    updateTime() {
        let data: Date = new Date();
        let latestDay: number = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();

        let up: Array<number> = [0, 12, latestDay, 24, 60, 60];
        while (up.length) {
            let index: number = up.length - 1;
            let upper: number = up.pop();
            let key: string = this.keys[index];

            if (++this.timeObj[key] >= upper && upper) {
                this.timeObj[key] = index >= 3 ? 0 : 1;
            }
        }

        this.common.drawText(this.timeObj);
    }

    animate() {
        this.frontCtx.clearRect(0, 0, this.front.width, this.front.height);
        this.frontCtx.beginPath();
        Object.keys(this.cache).forEach((key) => {
            this.cache[key].forEach((line) => {
                line.update()
            })
        });

        this.frontCtx.stroke();

        let newTime:number = Date.now();
        if (newTime - this.timer >= 1000) {
            this.updateTime();
            this.timer = newTime;
        }

        requestAnimationFrame(()=>this.animate());
    }
}

let main: Main = new Main();
main.animate();

