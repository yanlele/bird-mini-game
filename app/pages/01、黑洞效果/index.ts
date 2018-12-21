/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-19 21:26
 */

import './index.less';

class Index {
    protected BH_SIZE: number;
    protected BlackHole;
    protected Particle;
    protected RAF;
    protected animate;
    protected bgImage;
    protected bhImage;
    protected blackHoles;
    protected bufferCanvas: HTMLCanvasElement;
    protected bufferCtx: CanvasRenderingContext2D;
    protected canvas;
    protected ctx;
    protected execAnimate;
    protected particles;
    protected target;

    constructor() {
        this.particles = [];
        this.blackHoles = [];
        this.BH_SIZE = 15;
        this.canvas = document.getElementById('cas');
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCtx = this.bufferCanvas.getContext('2d');
        this.bufferCanvas.width = this.canvas.width = document.body.offsetWidth;
        this.bufferCanvas.height = this.canvas.height = document.body.offsetHeight;

        window.onresize = () => {
            this.bufferCanvas.width = this.canvas.width = document.body.offsetWidth;
            return this.bufferCanvas.height = this.canvas.height = document.body.offsetHeight;
        };

        this.RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    }

    main() {
        console.log('运行起来')
    }
}

// 粒子对象
class Particle extends Index {
    private x: number;
    private y: number;
    private r: number;
    private color: string;
    private vx: number;
    private vy: number;
    private ax: number;
    private ay: number;

    private oldx: number;           // 老数据暂存
    private oldy: number;           // 老数据暂存

    constructor(options) {
        super();
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.color = options.color;
        this.init();
    }

    init() {
        this.vx = Math.random() * 4 - 2;                // x 方向速度
        this.vy = Math.random() * 4 - 2;                // y 方向速度
        this.ax = 0;                                    // x 加速度
        this.ay = 0;                                    // y 加速度
    }

    // 移动
    move() {
        let maxSpeed: number,
            ref,
            ref1;
        this.vx += this.ax;
        this.vy += this.ay;
        maxSpeed = 10;
        this.vx = Math.abs(this.vx) > maxSpeed ? maxSpeed * Math.abs(this.vx) / this.vx : this.vx;              // x 方向限速
        this.vy = Math.abs(this.vy) > maxSpeed ? maxSpeed * Math.abs(this.vy) / this.vy : this.vy;              // y 方向限速

        this.oldx = this.x;
        this.oldy = this.y;

        this.x += this.vy;
        this.y += this.vx;

        this.vx = (0 <= (ref = this.x) && ref <= this.canvas.width + this.r * 2) ? this.vx : -this.vx * 0.98;
        this.vy = (0 <= (ref1 = this.y) && ref1 <= this.canvas.height + this.r * 2) ? this.vy : -this.vy * 0.98;
    }

    // 吸引
    attract() {
        let angle, bh, cx, cy, k, lax, lay, len, power, results;
        this.ax = this.ay = 0;
        let result = [];
        for (k = 0, len = this.blackHoles.length; k < len; k++) {
            bh = this.blackHoles[k];
            cx = bh.x - this.x;
            cy = bh.y - this.y;
            angle = Math.atan(cx / cy);
            power = bh.power * 0.1;
            lax = Math.abs(power * Math.sin(angle));
            lay = Math.abs(power * Math.cos(angle));
            this.ax += cx > 0 ? lax : -lax;
            results.push(this.ay += cy > 0 ? lay : -lay);
        }
        return results;
    }

    // 绘制
    draw() {
        this.bufferCtx.save();
        this.bufferCtx.strokeStyle = this.color;
        this.bufferCtx.lineCap = this.bufferCtx.lineJoin = "round";
        this.bufferCtx.lineWidth = this.r;
        this.bufferCtx.beginPath();
        this.bufferCtx.moveTo(this.oldx - this.r, this.oldy - this.r);
        this.bufferCtx.lineTo(this.x - this.r, this.y - this.r);
        this.bufferCtx.stroke();
        this.bufferCtx.restore();
    }
}

class BlackHole extends Index {
    private x: number;
    private y: number;
    private r: number;
    private power: number;
    private step: number;
    private bigger: number;
    private isAdd: boolean;
    private ir: number;
    private destory;

    constructor(options) {
        super();
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.power = options.power;
        this.step = 2;
        this.bigger = 5;

        // todo 这个地方需要添加 this.animate(0);
    }


    drawLight(ctx) {
        let imgr;
        if (this.isAdd) {
            if ((this.ir += this.step) ? (this.r + this.bigger)) {
                this.isAdd = false;
            }
        } else {
            this.ir = this.ir <= this.r ? this.r : this.ir - this.step;
            if (this.destory && this.ir === this.r) {
                this.blackHoles.splice(this.blackHoles.indexOf(this), 1);               // 删除黑洞
            }
        }
        imgr = this.ir * 1.4;
        return this.ctx.drawImage(this.bgImage, this.x - imgr, this.y - imgr, imgr * 2, imgr * 2);
    }

    draw(ctx) {
        let _this = this;
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.arc(this.x, this.y, this.ir, 0, Math.PI * 2);
        return ctx.fill();
    }
}


let index: Index = new Index();
index.main();