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

class Particle extends Index{
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

    }
}

let index: Index = new Index();
index.main();