/**
 * create by yanlele
 * create time 2018-10-12 11:23
 */

/**
 * 主要是用来对基本的一些内容的控制，比如canvas的大小之类的
 */
class Common {
    private canvas;
    private ctx;

    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute('width', window.innerWidth);
        this.canvas.setAttribute('height', window.innerHeight);


    }
}

export default Common;