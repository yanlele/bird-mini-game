/**
 * create by yanlele
 * create time 2018-10-12 15:59
 */
import InitTime from "./InitTime.js";

import {IPos} from './CommonInterface.js'


class Line extends InitTime {

    private pos1: IPos;
    private pos2: IPos;
    private value: string = '0';
    private moving: boolean = false;
    private shouldMove: boolean = false;
    private frontLine: any;

    private start: IPos;
    private end: IPos;
    private direction = false;

    private movingPos: IPos = null;
    private goalPos: IPos = null;
    private addPos: IPos = null;

    constructor(pos1: IPos, pos2: IPos, frontLine) {
        super();
        this.pos1 = pos1;
        this.pos2 = pos2;
        this.frontLine = frontLine;

        this.start = this.pos1;
        this.end = this.pos2;
    }

    frontIsStatic(): boolean {
        return !this.frontLine || (this.frontLine && this.frontLine.isStatic());
    }

    isStatic(): boolean {
        return !this.moving && this.frontIsStatic();
    }

    update() {
        if (this.frontIsStatic()) {
            this.moving = this.shouldMove;
        }

        if (this.moving) {
            this.updateToGoal();
            if (this.equal(this.movingPos, this.goalPos)) {
                this.shouldMove = this.moving = false;
            }
        }

        if (!this.equal(this.start, this.end) || this.moving) {
            this.frontCtx.moveTo(this.start.x, this.start.y);           // moveTo 表示把坐标移动到某一个点
            this.frontCtx.lineTo(this.end.x, this.end.y);               // lineTo 表示画的结束点，连接起来成为一条线
        }
    }

    updateToGoal() {
        if (this.movingPos.x !== this.goalPos.x) {
            this.movingPos.x += this.addPos.x;
            if (Math.abs(this.movingPos.x - this.goalPos.x) <= 0.1) {
                this.movingPos.x = this.goalPos.x;
            }
        }

        if (this.movingPos.y !== this.goalPos.y) {
            this.movingPos.y += this.addPos.y;
            if (Math.abs(this.movingPos.y - this.goalPos.y) <= 0.1) {
                this.movingPos.y = this.goalPos.y
            }
        }
    }

    equal(pos1: IPos, pos2: IPos): boolean {
        return pos1.x === pos2.x && pos1.y === pos2.y
    }

    move(type: number) {
        this.shouldMove = true;
        let newPos1: IPos = {x: this.pos1.x, y: this.pos1.y};
        let newPos2: IPos = {x: this.pos2.x, y: this.pos2.y};

        if (type === 1) {
            this.start = this.pos1;
            this.movingPos = this.end = newPos1;
            this.goalPos = newPos2;
        } else if (type === 2) {
            this.start = this.pos1;
            this.movingPos = this.end = newPos2;
            this.goalPos = newPos1;
        } else if (type === 3) {
            this.end = this.pos2;
            this.movingPos = this.start = newPos2;
            this.goalPos = newPos1;
        } else {
            this.end = this.pos2;
            this.movingPos = this.start = newPos1;
            this.goalPos = newPos2;
        }

        this.addPos = {
            x: (this.goalPos.x - this.movingPos.x) / 7,
            y: (this.goalPos.y - this.movingPos.y) / 7
        }
    }
}

export default Line;