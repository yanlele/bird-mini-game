/**
 * create by yanlele
 * create time 2018-10-12 16:48
 */
import InitTime from "./InitTime.js";
import {ITimeObj, IPos} from "./CommonInterface.js";
import Line from "./Line.js";

class Common extends InitTime {
    private latestIndex: number = 0;
    private startIndex: number = 0;

    constructor() {
        super();
    }

    formatTime(n) {
        let nStr: string = String(n);
        return nStr.length === 1 ? '0' + n : n;
    }

    readyForDraw(timeObj: ITimeObj, startIndex: number) {
        this.backCtx.clearRect(0, 0, this.back.width, this.back.height);
        this.backCtx.lineWidth = this.frontCtx.lineWidth = this.lineWidth;              // 设置绘图的线条宽度
        this.backCtx.fillStyle = this.color;

        let startX: number = 0;
        let a: number = this.halfTextWid - this.halfNumWidth;
        let b: number = this.halfTextWid + this.halfNumWidth;
        let c: number = this.y - this.halfNumHeight;
        let d: number = this.y + this.halfNumHeight;

        this.ch.forEach((text, index) => {
            if (index < startIndex) {
                return false;
            }

            let num: number = this.timeObj[this.keys[index]];
            let numStr: string = this.formatTime(num);
            for (let j: number = 0; j < numStr.length; j++) {
                let val: string = numStr[j];
                let map: string = this.timeMap[+val];
                let e: number = startX + a;
                let f: number = startX + b;
                let coors: Array<IPos> = [
                    {x: e, y: this.y}, // left-mid
                    {x: e, y: c}, // left-top
                    {x: f, y: c}, // right-top
                    {x: f, y: this.y}, // right-mid
                    {x: e, y: this.y}, // left-mid
                    {x: e, y: d}, // left-bottom
                    {x: f, y: d}, // right-bottom
                    {x: f, y: this.y}, // right-mid
                ];
                let cc = (this.cache[text + '_' + j] = []);
                this.backCtx.beginPath();
                this.backCtx.moveTo(coors[0].x, coors[0].y);

                for (let k: number = 1; k < coors.length; k++) {
                    this.backCtx.lineTo(coors[k].x, coors[k].y);
                    cc.push(new Line(coors[k - 1], coors[k], cc[cc.length - 1]));
                }

                this.backCtx.strokeStyle = '#eee';
                this.backCtx.stroke();
                startX += this.textWid;
            }
        })
    }

    drawText(timeObj: ITimeObj) {
        for (let i: number = 0; i < this.keys.length; i++) {
            if (timeObj[this.keys[i]]) {
                this.startIndex = i;
                break;
            }
        }

        if (!this.ready || this.startIndex !== this.latestIndex) {
            this.readyForDraw(timeObj, this.startIndex);
            this.ready = true
        }
        this.startIndex = this.latestIndex;
        this.ch.forEach((text, index) => {
            let num: number = timeObj[this.keys[index]];
            let numStr: string = this.formatTime(num);

            for (let j: number = 0; j < numStr.length; j++) {
                let cc = this.cache[text + '_' + j];
                if (!cc) {
                    continue;
                }
                let val: string = numStr[j];
                let map: string = this.timeMap[+val];
                for (let k: number = 0; k < map.length; k++) {
                    let val = map[k];
                    let line = cc[k];
                    if (line.value === val) {
                        continue;
                    }

                    line.value = val;
                    if (val === '1') {
                        if (cc[k + 1] && cc[k + 1].value === '1') {
                            // 1 -> 2
                            line.move(3);
                        } else {
                            // 1 <- 2
                            line.move(1);
                        }
                    } else {
                        if (cc[k - 1] && cc[k - 1].value === '1') {
                            // 1 -> 2
                            line.move(2);
                        } else {
                            // 1 <- 2
                            line.move(4);
                        }
                    }
                }
            }

        })
    }
}

export default Common;