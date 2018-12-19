/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-19 21:26
 */

import './index.less';

class Index {
    private BH_SIZE: number;
    private BlackHole;
    private Particle;
    private RAF;
    private animate;
    private bgImage;
    private bhImage;
    private blackHoles;
    private bufferCanvas: HTMLCanvasElement;
    private bufferCtx: CanvasRenderingContext2D;
    private canvas;
    private ctx;
    private execAnimate;
    private particles;
    private target;

    constructor() {
        this.particles = [];
        this.blackHoles = [];
        this.BH_SIZE = 15;
        this.canvas = document.getElementById('cas');
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCtx = this.bufferCanvas.getContext('2d');
        this.bufferCanvas.width = this.canvas.width = document.body.offsetWidth;
        this.bufferCanvas.height = this.canvas.height = document.body.offsetHeight;
    }

    main(){
        console.log('运行起来')
    }
}

let index:Index = new Index();
index.main();