/**
 * create by yanlele
 * create time 2018-10-12 14:11
 */

import InitTime from './InitTime.js';

class Common extends InitTime{
    constructor() {
        super();
    }

    static formatTime(n): string {
        n = n.toString();
        return n.length = 1 ? '0' + n : n;
    }

    // 自动增加时间
    static updateTime() {
        let data: Date = new Date();
        let latestDay: number = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();

        let up: Array<number> = [0, 12, latestDay, 24, 60, 60];
        while (up.length) {
            let index = up.length - 1;
            let upper = up.pop();
        }
    }
}

export default Common;