/**
 * create by yanlele
 * create time 2018-10-12 16:48
 */
import InitTime from "./InitTime.js";
import {ITimeObj} from "./CommonInterface.js";

class Common extends InitTime {
    constructor() {
        super();
    }

    readForDraw(timeObj: ITimeObj, startIndex: number) {
        this.backCtx.clearRect(0, 0, this.back.width, this.back.height);
        this.backCtx.lineWidth = this.frontCtx.lineWidth = this.lineWidth;              // 设置绘图的线条宽度
        this.backCtx.fillStyle = this.color;

        let startX: number = 0;
        let a: number = this.halfTextWid - this.halfNumWidth;
        let b: number = this.halfTextWid + this.halfNumWidth;
        let c: number = this.y - this.halfNumHeight;
        let d: number = this.y + this.halfNumHeight;

        this.ch.forEach(function (text, index) {
            if (index < startIndex) {
                return false;
            }
        })
    }
}