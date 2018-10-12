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

    formatTime(n): string {
        n = String(n);
        return n.length = 1 ? '0' + n : n;
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
                startX +=this.textWid;
            }
        })
    }
}