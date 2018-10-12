/**
 * create by yanlele
 * create time 2018-10-12 10:57
 */


class Main {
    private canvas;
    private ctx;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute('width', window.innerWidth);
        this.canvas.setAttribute('height', window.innerHeight);
    }

    init() {
        window.onresize = () => {
            this.canvas.setAttribute('width', window.innerWidth);
            this.canvas.setAttribute('height', window.innerHeight);
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    run() {

    }
}

const main: Main = new Main();
main.init();