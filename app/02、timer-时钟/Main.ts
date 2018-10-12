/**
 * create by yanlele
 * create time 2018-10-12 13:05
 */

import Store from './Store.js'
import InitTime from "./InitTime.js";
import {ITimeObj} from "./CommonInterface.js"

class Main extends InitTime{
    private store: Store = Store.getInstance();

    constructor() {
        super(0);
    }

    run(timeObj = this.timeObj) {
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

        // this.drawText(this.timeObj);
    }
}

export default Main;

